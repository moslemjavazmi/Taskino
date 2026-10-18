// RatingService/src/eventBus/contracts/rating.events.ts
export enum RatingEvents {
  RatingCreated = "rating.created",
}

export type RatingCreatedEvent = {
  eventId: string;
  eventType: RatingEvents.RatingCreated;
  occurredAt: string;
  correlationId: string;
  payload: {
    taskId: string;
    rateeId: string;
    score: number;
  };
};
