/*
  Warnings:

  - A unique constraint covering the columns `[userId,deviceHash]` on the table `TrustedDevice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TrustedDevice_userId_deviceHash_key" ON "TrustedDevice"("userId", "deviceHash");
