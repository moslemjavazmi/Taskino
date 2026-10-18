/*
  Warnings:

  - You are about to drop the `TaskSearch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TaskSearch";

-- CreateTable
CREATE TABLE "TaskerSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skills" TEXT NOT NULL,
    "city" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskerSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskerSearch_userId_key" ON "TaskerSearch"("userId");
