/*
  Warnings:

  - You are about to drop the column `comment` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `rating` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "comment",
DROP COLUMN "score",
ADD COLUMN     "rating" INTEGER NOT NULL;
