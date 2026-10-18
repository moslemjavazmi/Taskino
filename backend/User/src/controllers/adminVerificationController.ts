// // APIGateway/User/src/controllers/adminVerificationController.ts
// import { prisma } from "../lib/prisma";
// import { UserEvents } from "@eventBus/contracts/user.events";
// import { randomUUID } from "crypto";
// import { AuthRequest } from "../types/auth-request";

// export async function approveVerification(req: AuthRequest, res: Response) {
//   const adminId = req.user!.sub;

//   const result = await prisma.$transaction(async (tx) => {
//     const verification = await tx.verification.update({
//       where: { id: req.params.id },
//       data: { status: "APPROVED" },
//       include: { userProfile: true },
//     });

//     await tx.outboxEvent.create({
//       data: {
//         aggregateId: verification.userProfile.userId,
//         aggregate: "User",
//         type: UserEvents.VerificationApproved,
//         payload: {
//           eventId: randomUUID(),
//           eventType: UserEvents.VerificationApproved,
//           version: 1,
//           occurredAt: new Date().toISOString(),
//           payload: {
//             userId: verification.userProfile.userId,
//             verifiedBy: adminId,
//           },
//         },
//       },
//     });

//     return verification;
//   });

//   res.json(result);
// }
