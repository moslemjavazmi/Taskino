// import prisma from '../lib/prisma';
// import { publishEvent } from '../lib/kafka';

// export async function publishOutboxEvents() {
//   const events = await prisma.outboxEvent.findMany({
//     where: { status: 'PENDING' },
//     take: 100,
//     orderBy: { createdAt: 'asc' },
//   });

//   for (const event of events) {
//     try {
//       await publishEvent(event.aggregate, event.aggregateId, event.payload as object);
//       await prisma.outboxEvent.update({
//         where: { id: event.id },
//         data: { status: 'SENT', sentAt: new Date() },
//       });
//       console.log(`✅ Outbox event sent: ${event.id}`);
//     } catch (error) {
//       console.error(`❌ Failed event: ${event.id}`, error);
//       await prisma.outboxEvent.update({
//         where: { id: event.id },
//         data: { status: 'FAILED' },
//       });
//     }
//   }
// }
import prisma from '../lib/prisma';
import { publishEvent } from '../lib/kafka';

export async function publishOutboxEvents() {
  const events = await prisma.outboxEvent.findMany({
    where: { status: 'PENDING' },
    take: 100,
    orderBy: { createdAt: 'asc' },
  });

  console.log(`📤 Found ${events.length} pending outbox events`);

  for (const event of events) {
    try {
      console.log(`📤 Sending event ${event.id} (${event.type}) to topic "${event.aggregate}"`);
      await publishEvent(event.aggregate, event.aggregateId, event.type, event.payload as object);
      
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: 'SENT', sentAt: new Date() },
      });
      console.log(`✅ Outbox event sent: ${event.id}`);
    } catch (error) {
      console.error(`❌ Failed event: ${event.id}`, error);
      await prisma.outboxEvent.update({
        where: { id: event.id },
        data: { status: 'FAILED' },
      });
    }
  }
}