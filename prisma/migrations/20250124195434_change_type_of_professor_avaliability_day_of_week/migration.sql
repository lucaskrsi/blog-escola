/*
  Warnings:

  - Changed the type of `dayOfWeek` on the `ProfessorAvaliability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProfessorAvaliability" DROP COLUMN "dayOfWeek",
ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;
