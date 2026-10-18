-- AlterTable
ALTER TABLE "TaskSearch" ADD COLUMN     "category" TEXT;

-- CreateIndex
CREATE INDEX "TaskSearch_category_idx" ON "TaskSearch"("category");
