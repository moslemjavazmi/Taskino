-- CreateTable
CREATE TABLE "TaskerSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT,
    "skills" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "city" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskerSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskerSearch_userId_key" ON "TaskerSearch"("userId");

-- CreateIndex
CREATE INDEX "TaskerSearch_skills_idx" ON "TaskerSearch"("skills");

-- CreateIndex
CREATE INDEX "TaskerSearch_city_idx" ON "TaskerSearch"("city");

-- CreateIndex
CREATE INDEX "TaskerSearch_rating_idx" ON "TaskerSearch"("rating");
