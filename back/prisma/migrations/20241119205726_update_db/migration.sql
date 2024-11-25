/*
  Warnings:

  - You are about to alter the column `averageVote` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "averageVote" SET DATA TYPE DECIMAL(65,30);
