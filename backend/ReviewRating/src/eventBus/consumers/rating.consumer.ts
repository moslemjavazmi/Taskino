// UserService/src/eventBus/consumers/rating.consumer.ts
import { startConsumer } from "@eventBus/consumer";
import { prisma } from "../../lib/prisma";

export async function startRatingConsumer() {
  await startConsumer("user-service", "rating.created", async (event: any) => {
    const { rateeId, score } = event.payload;

    await prisma.userProfile.update({
      where: { userId: rateeId },
      data: {
        rating: {
          increment: score,
        },
        ratingCount: {
          increment: 1,
        },
      },
    });
  });
}
