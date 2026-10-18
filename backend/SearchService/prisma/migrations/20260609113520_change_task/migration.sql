-- DropIndex
DROP INDEX "TaskSearch_userId_idx";

-- AlterTable
ALTER TABLE "TaskSearch" ADD COLUMN     "budget" INTEGER;
