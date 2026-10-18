-- AlterTable
ALTER TABLE "TaskOffer" ALTER COLUMN "estimatedMinutes" DROP NOT NULL;

-- CreateTable
CREATE TABLE "TaskProjection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT,
    "description" TEXT,
    "budget" INTEGER,
    "location" TEXT,
    "status" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskProjection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TaskProjection_status_idx" ON "TaskProjection"("status");

-- CreateIndex
CREATE INDEX "TaskProjection_category_idx" ON "TaskProjection"("category");

-- CreateIndex
CREATE INDEX "TaskOffer_taskId_idx" ON "TaskOffer"("taskId");

-- CreateIndex
CREATE INDEX "TaskOffer_taskerId_idx" ON "TaskOffer"("taskerId");
