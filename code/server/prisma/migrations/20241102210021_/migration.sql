/*
  Warnings:

  - You are about to drop the column `likes` on the `guideLines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guideLines" DROP COLUMN "likes",
ALTER COLUMN "result" DROP NOT NULL;
