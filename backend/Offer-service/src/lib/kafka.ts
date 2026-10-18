// // // src/lib/kafka.ts

// // import { Kafka } from 'kafkajs';

// // const kafka = new Kafka({
// //   clientId: 'task-service',
// //    brokers: [
// //     process.env.KAFKA_BROKER ||
// //       'localhost:29092',
// //   ],
// // });

// // export const producer = kafka.producer();

// // export async function connectKafka() {
// //   await producer.connect();

// //   console.log('✅ Kafka connected');
// // }

// // export async function publishEvent(
// //   topic: string,
// //   key: string,
// //   value: object,
// // ) {
// //   await producer.send({
// //     topic,
// //     messages: [
// //       {
// //         key,
// //         value: JSON.stringify(value),
// //       },
// //     ],
// //   });
// // }


// import { Kafka } from 'kafkajs';

// const kafka = new Kafka({
//   clientId: 'offer-service',
//    brokers: [
//     process.env.KAFKA_BROKER ||
//       'localhost:29092',
//   ],
// });

// export const producer = kafka.producer();

// export async function connectKafka() {
//   await producer.connect();
//   console.log('✅ Kafka (producer) connected');
// }

// export async function publishEvent(topic: string, key: string, value: object) {
//   await producer.send({
//     topic,
//     messages: [{ key, value: JSON.stringify(value) }],
//   });
// }

// export function createConsumer(groupId: string) {
//   return kafka.consumer({ groupId });
// }
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'offer-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:29092'],
});

export const producer = kafka.producer();

export async function connectKafka() {
  await producer.connect();
  console.log('✅ Kafka (producer) connected');
}

export async function publishEvent(aggregate: string, aggregateId: string, type: string, payload: object) {
  console.log(`📤 Publishing event to topic "${aggregate}"`, { aggregateId, type, payload });
  await producer.send({
    topic: aggregate,
    messages: [
      {
        key: aggregateId,
        value: JSON.stringify({ type, ...payload }),
      },
    ],
  });
}

export function createConsumer(groupId: string) {
  return kafka.consumer({ groupId });
}