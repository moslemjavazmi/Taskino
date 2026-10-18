-- CreateTable
CREATE TABLE "TaskerSearchProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "skills" TEXT[],
    "locationLat" DOUBLE PRECISION NOT NULL,
    "locationLng" DOUBLE PRECISION NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskerSearchProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskerSearchProfile_userId_key" ON "TaskerSearchProfile"("userId");

-- CreateIndex
CREATE INDEX "TaskerSearchProfile_isActive_idx" ON "TaskerSearchProfile"("isActive");
