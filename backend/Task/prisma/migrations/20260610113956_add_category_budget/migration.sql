-- DropIndex
DROP INDEX "Task_status_idx";

-- DropIndex
DROP INDEX "Task_userId_idx";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "budget" INTEGER,
ADD COLUMN     "category" TEXT;
