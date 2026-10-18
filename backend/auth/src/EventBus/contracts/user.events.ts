// eventBus/contracts/user.events.ts
export namespace UserEvents {
  export const VerificationApproved = "user.verification.approved.v1";

  export interface VerificationApprovedPayload {
    userId: string;
    verifiedBy: string;
  }

  export interface VerificationApprovedEvent {
    eventId: string;
    eventType: typeof VerificationApproved;
    version: 1;
    occurredAt: string;
    payload: VerificationApprovedPayload;
  }
}
