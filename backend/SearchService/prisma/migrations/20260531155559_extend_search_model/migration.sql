/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `TaskSearch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskSearch" DROP COLUMN "updatedAt",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "locationLat" DOUBLE PRECISION,
ADD COLUMN     "locationLng" DOUBLE PRECISION,
ADD COLUMN     "scheduledAt" TIMESTAMP(3);
