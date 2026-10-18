/*
  Warnings:

  - You are about to drop the `TaskerSearch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TaskerSearch";

-- CreateTable
CREATE TABLE "TaskSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "locationLat" DOUBLE PRECISION,
    "locationLng" DOUBLE PRECISION,
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TaskSearch_userId_idx" ON "TaskSearch"("userId");

-- CreateIndex
CREATE INDEX "TaskSearch_title_idx" ON "TaskSearch"("title");

-- CreateIndex
CREATE INDEX "TaskSearch_location_idx" ON "TaskSearch"("location");
