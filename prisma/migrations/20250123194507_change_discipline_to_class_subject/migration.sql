/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the `CourseDiscipline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discipline` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DisciplineTaught` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classSubjectId` to the `Classroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Classroom_disciplineId_idx";

-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "disciplineId",
ADD COLUMN     "classSubjectId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CourseDiscipline";

-- DropTable
DROP TABLE "Discipline";

-- DropTable
DROP TABLE "DisciplineTaught";

-- CreateTable
CREATE TABLE "ClassSubject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ClassSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSubjectTaught" (
    "id" TEXT NOT NULL,
    "classSubjectId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,

    CONSTRAINT "ClassSubjectTaught_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseClassSubject" (
    "id" TEXT NOT NULL,
    "courseCurriculumId" TEXT NOT NULL,
    "classSubjectId" TEXT NOT NULL,

    CONSTRAINT "CourseClassSubject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClassSubjectTaught_classSubjectId_idx" ON "ClassSubjectTaught"("classSubjectId");

-- CreateIndex
CREATE INDEX "ClassSubjectTaught_professorId_idx" ON "ClassSubjectTaught"("professorId");

-- CreateIndex
CREATE INDEX "CourseClassSubject_courseCurriculumId_idx" ON "CourseClassSubject"("courseCurriculumId");

-- CreateIndex
CREATE INDEX "CourseClassSubject_classSubjectId_idx" ON "CourseClassSubject"("classSubjectId");

-- CreateIndex
CREATE INDEX "Classroom_classSubjectId_idx" ON "Classroom"("classSubjectId");
