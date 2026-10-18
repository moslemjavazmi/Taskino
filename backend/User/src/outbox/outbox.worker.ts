// APIGateway/User/src/outbox/outbox.worker.ts
import { prisma } from "../lib/prisma";

import { publishEvent } from "./../eventBus/producer";

const BATCH_SIZE = 10;

export async function runOutboxWorker() {
  const events = await prisma.outboxEvent.findMany({
    where: { status: "PENDING" },
    take: BATCH_SIZE,
    orderBy: { createdAt: "asc" },
  });

  for (const event of events) {
    try {
      await publishEvent(event.type, event.payload as any);

      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: {
          status: "SENT",
          sentAt: new Date(),
        },
      });
    } catch (err) {
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: "FAILED" },
      });
    }
  }
}
