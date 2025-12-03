/*
  Warnings:

  - You are about to alter the column `text` on the `Question` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `title` on the `Quiz` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "text" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "title" SET DATA TYPE VARCHAR(250);
