// src/outbox/outbox.worker.ts
import { prisma } from "../lib/prisma";
import { publishEvent } from "../eventBus/producer";

export async function runOutboxWorker() {
  const events = await prisma.outboxEvent.findMany({
    where: { status: "PENDING" },
    take: 10,
    orderBy: { createdAt: "asc" },
  });

  for (const event of events) {
    try {
      await publishEvent(event.type, event.payload as any);
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: "SENT", sentAt: new Date() },
      });
    } catch {
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: "FAILED" },
      });
    }
  }
}
