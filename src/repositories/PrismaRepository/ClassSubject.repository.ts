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
import { IClassSubject } from "../../models/interfaces/ClassSubject.interface";
import { ClassSubject } from "../../models/ClassSubject";
import { IClassSubjectRepository } from "../../repositories/interfaces/ClassSubject.repository.interface";

export class ClassSubjectRepository implements IClassSubjectRepository {

    async create(classSubject: IClassSubject): Promise<IClassSubject> {

        let classSubjectPrisma = await prisma.classSubject.create({
            data: {
                name: classSubject.getName(),
            },
        })

        classSubject.setId(classSubjectPrisma.id);
        return classSubject;
    }

    async get(id: string): Promise<IClassSubject> {
        const classSubjectPrisma = await prisma.classSubject.findUnique({
            where: {
                id: id,
            },
        })

        if (!classSubjectPrisma) {
            throw HttpException.NotFoundError("Class subject not found");
        }

        const classObject = new Class(
            classSubjectPrisma.name,
            classSubjectPrisma.id
        );

        return classObject;
    }

    async getAll(): Promise<IClassSubject[]> {
        const classSubjectPrisma = await prisma.classSubject.findMany();
        ClassSubject.classSubjectList = classSubjectPrisma.map((classSubjectObject) => {
            return new ClassSubject(
                classSubjectObject.name,
                classSubjectObject.id
            );
        });

        return ClassSubject.classSubjectList;
    }

    async update(id: string, name?: string): Promise<IClassSubject> {
        let classSubjectPrisma = await this.get(id);

        if (!classSubjectPrisma) {
            throw HttpException.NotFoundError("Class subject not found");
        }

        let classSubjectObject = await prisma.classSubject.update({
            where: {
                id: classSubjectPrisma.getId(),
            },
            data: {
                name: (typeof name == "string") ? name : classSubjectPrisma.getName(),
            }
        })

        classSubjectPrisma.setName(classSubjectObject.name);
        return classSubjectPrisma;
    }

    async delete(id: string): Promise<string> {
        let classSubjectPrisma = await this.get(id);

        if (!classSubjectPrisma) {
            throw HttpException.NotFoundError("Class subject not found");
        }

        let classSubject = await prisma.classSubject.delete({
            where: {
                id: classSubjectPrisma.getId(),
            }
        })

        return classSubject.id.toString();
    }

}