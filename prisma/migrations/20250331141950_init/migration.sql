/*
  Warnings:

  - Added the required column `userId` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
