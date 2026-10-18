// UserService/src/eventBus/consumers/rating.consumer.ts

import { startConsumer } from "@eventBus/consumer";
import { prisma } from "../../lib/prisma";

export async function startRatingConsumer() {
  await startConsumer("user-service", "rating.created", async (event: any) => {
    const { rateeId, score } = event.payload;

    await prisma.$transaction(async (tx) => {
      // 1️⃣ Load user profile
      const profile = await tx.userProfile.findUnique({
        where: { userId: rateeId },
      });

      if (!profile) return;

      // 2️⃣ Load active penalties (minimum factor wins)
      const penalties = await tx.ratingPenalty.findMany({
        where: {
          rateeId,
          expiresAt: { gt: new Date() },
        },
      });

      const penaltyFactor =
        penalties.length === 0
          ? 1
          : Math.min(...penalties.map((p) => p.factor));

      // 3️⃣ Compute trust factor
      let trustFactor = 1;

      if (!profile.isVerified) {
        trustFactor = 0.7;
      } else if (profile.completedTasks > 20) {
        trustFactor = 1.2;
      } else if (profile.completedTasks > 5) {
        trustFactor = 1.0;
      }

      // 4️⃣ Final weighted score
      const finalScore = score * trustFactor * penaltyFactor;

      // 5️⃣ Update rolling average
      const oldAvg = profile.rating;
      const oldCount = profile.ratingCount;

      const newCount = oldCount + 1;
      const newAvg = (oldAvg * oldCount + finalScore) / newCount;

      await tx.userProfile.update({
        where: { userId: rateeId },
        data: {
          rating: newAvg,
          ratingCount: newCount,
        },
      });
    });
  });
}
