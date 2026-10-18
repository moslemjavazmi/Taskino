import { publishEvent } from './producer';
import crypto from 'crypto';

export async function publishTaskerUpdated(
  payload: any,
) {
  await publishEvent(
    'taskers',

    {
      eventId: crypto.randomUUID(),

      eventType: 'TASKER_UPDATED',

      occurredAt:
        new Date().toISOString(),

      payload,
    },
  );
}