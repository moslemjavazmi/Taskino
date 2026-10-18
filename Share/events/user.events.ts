export const UserEvents = {
  VERIFICATION_APPROVED: "user.verification.approved",
};

export type VerificationApprovedEvent = {
  eventId: string;
  occurredAt: string;
  payload: {
    userId: string;
    verificationType: string;
  };
};
