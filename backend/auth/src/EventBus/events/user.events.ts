// task/eventBus/events/user.events.ts
export enum UserEvents {
  VERIFICATION_APPROVED = "user.verification.approved",
}

export interface VerificationApprovedEvent {
  eventId: string;
  occurredAt: string;
  payload: {
    userId: string;
    verificationType: string;
  };
}
