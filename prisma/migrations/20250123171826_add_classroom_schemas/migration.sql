-- CreateTable
CREATE TABLE "Discipline" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessorAvaliability" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessorAvaliability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisciplineTaught" (
    "id" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,

    CONSTRAINT "DisciplineTaught_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseCurriculum" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CourseCurriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseDiscipline" (
    "id" TEXT NOT NULL,
    "courseCurriculumId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,

    CONSTRAINT "CourseDiscipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassCourseCurriculum" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "courseCurriculumId" TEXT NOT NULL,
    "semester" INTEGER NOT NULL,

    CONSTRAINT "ClassCourseCurriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classroomPeriod" TEXT NOT NULL,
    "classroomCapacity" INTEGER NOT NULL,
    "classId" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProfessorAvaliability_professorId_idx" ON "ProfessorAvaliability"("professorId");

-- CreateIndex
CREATE INDEX "DisciplineTaught_disciplineId_idx" ON "DisciplineTaught"("disciplineId");

-- CreateIndex
CREATE INDEX "DisciplineTaught_professorId_idx" ON "DisciplineTaught"("professorId");

-- CreateIndex
CREATE INDEX "CourseDiscipline_courseCurriculumId_idx" ON "CourseDiscipline"("courseCurriculumId");

-- CreateIndex
CREATE INDEX "CourseDiscipline_disciplineId_idx" ON "CourseDiscipline"("disciplineId");

-- CreateIndex
CREATE INDEX "ClassCourseCurriculum_classId_idx" ON "ClassCourseCurriculum"("classId");

-- CreateIndex
CREATE INDEX "ClassCourseCurriculum_courseCurriculumId_idx" ON "ClassCourseCurriculum"("courseCurriculumId");

-- CreateIndex
CREATE INDEX "Classroom_classId_idx" ON "Classroom"("classId");

-- CreateIndex
CREATE INDEX "Classroom_disciplineId_idx" ON "Classroom"("disciplineId");

-- CreateIndex
CREATE INDEX "Classroom_professorId_idx" ON "Classroom"("professorId");
