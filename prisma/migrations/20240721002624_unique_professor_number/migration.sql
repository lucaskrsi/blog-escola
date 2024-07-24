/*
  Warnings:

  - A unique constraint covering the columns `[professorNumber]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Professor_professorNumber_key" ON "Professor"("professorNumber");
