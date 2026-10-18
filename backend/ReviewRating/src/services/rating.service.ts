//backend/ReviewRating/src/services/rating.service.ts
import { prisma } from "../lib/prisma";

export async function createRating(data: {
  taskId: string;
  raterId: string;
  rateeId: string;
  score: number;
  comment?: string;
}) {
  if (data.score < 1 || data.score > 5) {
    throw new Error("Score must be between 1 and 5");
  }

  return prisma.$transaction(async (tx) => {
    const now = new Date();

    // 1️⃣ Validate task
    const task = await tx.taskSnapshot.findUnique({
      where: { taskId: data.taskId },
    });

    if (!task) throw new Error("Task not found");
    if (task.status !== "COMPLETED") throw new Error("Task is not completed");
    if (task.ownerId !== data.raterId)
      throw new Error("Only task owner can rate");
    if (task.taskerId !== data.rateeId) throw new Error("Invalid ratee");

    // 2️⃣ Prevent duplicate rating
    const exists = await tx.rating.findUnique({
      where: { taskId: data.taskId },
    });
    if (exists) throw new Error("Rating already exists");

    // 3️⃣ Anti-Fraud — Daily limit (per rater)
    const daily = await tx.ratingAbuseCounter.findFirst({
      where: {
        raterId: data.raterId,
        window: "DAILY",
        expiresAt: { gt: now },
      },
    });
    if (daily && daily.count >= 5)
      throw new Error("Daily rating limit exceeded");

    // 4️⃣ Anti-Fraud — Monthly per (rater → ratee)
    const monthly = await tx.ratingAbuseCounter.findFirst({
      where: {
        raterId: data.raterId,
        rateeId: data.rateeId,
        window: "MONTHLY",
        expiresAt: { gt: now },
      },
    });
    if (monthly && monthly.count >= 3)
      throw new Error("Too many ratings for this tasker");

    // ================================
    // 🔥 STEP 1 — Anti-Collusion Logic
    // ================================
    const suspiciousRatings = await tx.rating.count({
      where: {
        raterId: data.raterId,
        rateeId: data.rateeId,
        score: { gte: 4 },
        createdAt: {
          gt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    if (suspiciousRatings >= 3) {
      await tx.ratingPenalty.create({
        data: {
          raterId: data.raterId,
          rateeId: data.rateeId,
          factor: 0.2,
          reason: "Suspicious repeated high ratings",
        },
      });
    }

    // 5️⃣ Create rating
    const rating = await tx.rating.create({
      data: {
        taskId: data.taskId,
        raterId: data.raterId,
        rateeId: data.rateeId,
        score: data.score,
        comment: data.comment,
      },
    });

    // 6️⃣ Emit event
    await tx.outboxEvent.create({
      data: {
        aggregateId: data.rateeId,
        aggregate: "Rating",
        type: "rating.created",
        payload: {
          taskId: data.taskId,
          rateeId: data.rateeId,
          score: data.score,
        },
      },
    });

    // 7️⃣ Update counters
    await tx.ratingAbuseCounter.upsert({
      where: {
        raterId_rateeId_window: {
          raterId: data.raterId,
          rateeId: data.rateeId,
          window: "MONTHLY",
        },
      },
      update: { count: { increment: 1 } },
      create: {
        raterId: data.raterId,
        rateeId: data.rateeId,
        window: "MONTHLY",
        count: 1,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    await tx.ratingAbuseCounter.upsert({
      where: {
        raterId_window: {
          raterId: data.raterId,
          window: "DAILY",
        },
      },
      update: { count: { increment: 1 } },
      create: {
        raterId: data.raterId,
        window: "DAILY",
        count: 1,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    // 8️⃣ Flag (for admin / ML only)
    if (data.score === 5 && suspiciousRatings >= 2) {
      await tx.ratingFlag.create({
        data: {
          raterId: data.raterId,
          rateeId: data.rateeId,
          reason: "Repeated high ratings in short period",
        },
      });
    }

    return rating;
  });
}
