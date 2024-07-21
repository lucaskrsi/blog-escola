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

export class ClassRepository implements IClassRepository {

    async getPosts(classObject: IClass): Promise<IPost[]> {
        const postPrisma = await prisma.post.findMany({
            where: {
                classId: classObject.getId(),
            },
            include: {
                author: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        let posts = postPrisma.map(post => {
            return new Post(
                classObject,
                new Professor(
                    new User(
                        post.author.user.name,
                        post.author.user.email,
                        post.author.user.password,
                        post.author.user.role,
                        post.author.user.id,
                    ),
                    post.author.professorNumber,
                    post.author.id
                ),
                post.title,
                post.content,
                post.published,
                post.id
            );
        });

        return posts;
    }

    async getStudents(classObject: IClass): Promise<IStudent[]> {
        const studentPrisma = await prisma.student.findMany({
            include: {
                class: {
                    where : {
                        id: classObject.getId(),
                    },
                },
                user: true,
            }
        });
        
        if(!studentPrisma){
            throw HttpException.NotFoundError("No students enrolled in this class");
        }

        let studentList = studentPrisma.map((student) => {
            return new Student(
                new User(
                    student.user.name,
                    student.user.email,
                    student.user.password,
                    student.user.role,
                    student.user.id
                ),
                student.birthDate.toString(),
                student.ra,
                student.id
            );
        });

        return studentList;       
    }

    async addStudent(classObject: IClass, student: IStudent): Promise<IClass> {
        const classPrisma = await prisma.class.update({
            where : {
                id: student.getId(),
            },
            data:{
                student:{
                    connect:{
                        id: student.getId(),
                    }
                }
            },
            include: {
                student: {
                    include: {
                        user: true,
                    }
                },
            }
        });

        let studentList = classPrisma.student.map((student) => {
            return new Student(
                new User(
                    student.user.name,
                    student.user.email,
                    student.user.password,
                    student.user.role,
                    student.user.id
                ),
                student.birthDate.toString(),
                student.ra,
                student.id
            );
        });

        classObject.addStudents(studentList);

        return classObject;
    }

    async create(classObject: IClass): Promise<IClass> {
       
        let classPrisma = await prisma.class.create({
            data: {
                name: classObject.getName(),
            },
        })

        classObject.setId(classPrisma.id);
        return classObject;
    }

    async get(id: string): Promise<IClass> {
        const classPrisma = await prisma.class.findUnique({
            where: {
                id: id,
            },
            include: {
                student: true,
            }
        })

        if (!classPrisma) {
            throw HttpException.NotFoundError("Class not found");
        }

        const classObject = new Class(
            classPrisma.name,
            classPrisma.id
        );

        return classObject;
    }

    async getAll(): Promise<IClass[]> {
        const classPrisma = await prisma.class.findMany();
        Class.classList = classPrisma.map((classObject) => {
            return new Class(
                    classObject.name,
                    classObject.id
            );
        });

        return Class.classList;
    }

    async update(id: string, name?: string): Promise<IClass> {
        let classPrisma = await this.get(id);

        if (!classPrisma) {
            throw HttpException.NotFoundError("Class not found");
        }

        let classObject = await prisma.class.update({
            where: {
                id: classPrisma.getId(),
            },
            data: {
                name: (typeof name == "string") ? name : classPrisma.getName(),
            },
            include: {
                student: true,
            }
        })

        classPrisma.setName(classObject.name);
        return classPrisma;
    }

    async delete(id: string): Promise<string> {
        let classPrisma = await this.get(id);

        if (!classPrisma) {
            throw HttpException.NotFoundError("Class not found");
        }

        let user = await prisma.class.delete({
            where: {
                id: classPrisma.getId(),
            }
        })

        return user.id.toString();
    }

}