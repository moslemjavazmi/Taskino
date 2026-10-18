/*
  Warnings:

  - You are about to drop the `TaskerSearchProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TaskerSearchProfile";

-- CreateTable
CREATE TABLE "TaskSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskSearch_pkey" PRIMARY KEY ("id")
);
