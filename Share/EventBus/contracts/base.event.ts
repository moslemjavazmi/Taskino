// eventBus/contracts/base.event.ts
export interface BaseEvent<TPayload> {
  eventId: string;
  eventType: string;
  version: number;
  occurredAt: string;
  payload: TPayload;
}
