/*
  Warnings:

  - The values [CREATED,ASSIGNED,ACCEPTED,STARTED] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'OFFERING', 'CUSTOMER_SELECTED', 'TASKER_CONFIRMED', 'READY_TO_START', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'FAILED');
ALTER TABLE "public"."Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "public"."TaskStatus_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'PENDING_APPROVAL';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "approvedByAdminId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING_APPROVAL';

-- CreateTable
CREATE TABLE "TaskCancellation" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "actorType" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCancellation_pkey" PRIMARY KEY ("id")
);
