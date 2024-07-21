/*
  Warnings:

  - You are about to drop the column `name` on the `Professor` table. All the data in the column will be lost.
  - Added the required column `professorNumber` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "name",
ADD COLUMN     "professorNumber" INTEGER NOT NULL;
