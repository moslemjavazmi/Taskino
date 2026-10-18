//backend/ReviewRating/src/eventBus/consumers/task.consumer.ts
import { startConsumer } from "@eventBus/consumer";
import { prisma } from "../../lib/prisma";

export async function startTaskConsumer() {
  await startConsumer(
    "rating-service",
    ["task.created", "task.completed", "task.cancelled"],
    async (event: any) => {
      const { taskId, status, userId, taskerId } = event.payload;

      await prisma.taskSnapshot.upsert({
        where: { taskId },
        update: { status, taskerId },
        create: {
          taskId,
          status,
          ownerId: userId,
          taskerId,
        },
      });
    },
  );
}
