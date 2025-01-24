import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { User } from "../../models/User";
import { IClassRepository } from "../interfaces/Class.repository.interface";
import { IClass } from "../../models/interfaces/Class.interface";
import { Class } from "../../models/Class";
import { IPost } from "../../models/interfaces/Post.interface";
import { IStudent } from "../../models/interfaces/Student.interface";
import { Student } from "../../models/Student";
import { Post } from "../../models/Post";
import { Professor } from "../../models/Professor";
import { IClassroom } from "../../models/interfaces/Classroom.interface";
import { Classroom } from "../../models/Classroom";
import { IProfessor } from "../../models/interfaces/Professor.interface";
import { IClassSubject } from "../../models/interfaces/ClassSubject.interface";
import { ClassSubject } from "../../models/ClassSubject";
import { IClassroomRepository } from "../../repositories/interfaces/Classroom.repository.interface";

export class ClassroomRepository implements IClassroomRepository {

    async create(classroom: IClassroom): Promise<IClassroom> {

        let classroomPrisma = await prisma.classroom.create({
            data: {
                name: classroom.getName(),
                classroomPeriod: classroom.getClassroomPeriod(),
                classroomCapacity: classroom.getClassroomCapacity(),
                hours: classroom.getHours(),
                classSubjectId: classroom.getClassSubject().getId(),
                classId: classroom.getClass().getId(),
                professorId: classroom.getProfessor().getId()
            },
        })

        classroom.setId(classroomPrisma.id);
        return classroom;
    }

    async get(id: string): Promise<IClassroom> {
        const classroomPrisma = await prisma.classroom.findUnique({
            where: {
                id: id,
            },
            include: {
                professor: {
                    include: {
                        user: true,
                    }
                },
                classSubject: true,
                class: true,
            }
        })

        if (!classroomPrisma) {
            throw HttpException.NotFoundError("Classroom not found");
        }

        const classroom = new Classroom(
            classroomPrisma.name,
            classroomPrisma.classroomPeriod,
            classroomPrisma.classroomCapacity,
            new Professor(
                new User(
                    classroomPrisma.professor.user.name,
                    classroomPrisma.professor.user.email,
                    classroomPrisma.professor.user.password,
                    classroomPrisma.professor.user.role,
                    classroomPrisma.professor.user.id
                ),
                classroomPrisma.professor.professorNumber,
                classroomPrisma.professor.id
            ),
            new ClassSubject(
                classroomPrisma.classSubject.name,
                classroomPrisma.classSubject.id
            ),
            classroomPrisma.hours,
            new Class(
                classroomPrisma.class.name,
                classroomPrisma.class.id
            ),
            classroomPrisma.id
        );

        return classroom;
    }

    async getAll(): Promise<IClassroom[]> {
        const classroomPrisma = await prisma.classroom.findMany({
            include: {
                professor: {
                    include: {
                        user: true,
                    }
                },
                classSubject: true,
                class: true,
            }
        });

        Classroom.classroomList = classroomPrisma.map((classroomObject) => {
            return new Classroom(
                classroomObject.name,
                classroomObject.classroomPeriod,
                classroomObject.classroomCapacity,
                new Professor(
                    new User(
                        classroomObject.professor.user.name,
                        classroomObject.professor.user.email,
                        classroomObject.professor.user.password,
                        classroomObject.professor.user.role,
                        classroomObject.professor.user.id
                    ),
                    classroomObject.professor.professorNumber,
                    classroomObject.professor.id
                ),
                new ClassSubject(
                    classroomObject.classSubject.name,
                    classroomObject.classSubject.id
                ),
                classroomObject.hours,
                new Class(
                    classroomObject.class.name,
                    classroomObject.class.id
                ),
                classroomObject.id
            );
        });

        return Classroom.classroomList;
    }

    async update(id: string, name?: string, classroomPeriod?: string, classroomCapacity?: number, hours?: number, professor?: IProfessor, classObject?: IClass, classSubject?: IClassSubject): Promise<IClassroom> {
        let classroomPrisma = await this.get(id);

        if (!classroomPrisma) {
            throw HttpException.NotFoundError("Classroom not found");
        }

        let classroomObject = await prisma.classroom.update({
            where: {
                id: classroomPrisma.getId(),
            },
            data: {
                name: (typeof name == "string") ? name : classroomPrisma.getName(),
                classroomPeriod: (typeof classroomPeriod == "string")? classroomPeriod : classroomPrisma.getClassroomPeriod(),
                classroomCapacity: (typeof classroomCapacity === "number")? classroomCapacity : classroomPrisma.getClassroomCapacity(),
                hours: (typeof hours === "number")? hours : classroomPrisma.getHours(),
                professorId: (professor && typeof professor.getId === "string")? professor.getId() : classroomPrisma.getProfessor().getId(),
                classId: (classObject && typeof classObject.getId === "string")? classObject.getId() : classroomPrisma.getClass().getId(),
                classSubjectId: (classSubject && typeof classSubject.getId === "string")? classSubject.getId() : classroomPrisma.getClassSubject().getId(),
            }
        })

        classroomPrisma.setName(classroomObject.name);
        return classroomPrisma;
    }

    async delete(id: string): Promise<string> {
        let classroomPrisma = await this.get(id);

        if (!classroomPrisma) {
            throw HttpException.NotFoundError("Classroom not found");
        }

        let classroom = await prisma.classroom.delete({
            where: {
                id: classroomPrisma.getId(),
            }
        })

        return classroom.id.toString();
    }

}