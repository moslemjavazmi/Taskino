/*
  Warnings:

  - You are about to drop the column `location` on the `UserProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TaskerProfile" ADD COLUMN     "locationLat" DOUBLE PRECISION,
ADD COLUMN     "locationLng" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "location",
ADD COLUMN     "locationLat" DOUBLE PRECISION,
ADD COLUMN     "locationLng" DOUBLE PRECISION;
