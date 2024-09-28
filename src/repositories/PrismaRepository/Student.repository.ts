import { hashSync } from "bcrypt";
import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IStudent } from "../../models/interfaces/Student.interface";
import { IStudentRepository } from "../interfaces/Student.repository.interface";
import { Role } from "@prisma/client";
import { Student } from "../../models/Student";
import { User } from "../../models/User";

export class StudentRepository implements IStudentRepository {

    async create(student: IStudent): Promise<IStudent> {
        let userAlreadyExists = await prisma.user.findUnique({
            where: {
                email: student.user.getEmail(),
            },
        })

        if (userAlreadyExists) {
            throw HttpException.ConflictError("User already exists");
        }

        let studentPrisma = await prisma.student.create({
            data: {
                birthDate: student.getBirthDate(),
                ra: student.getRa(),
                user: {
                    create: {
                        name: student.user.getName(),
                        email: student.user.getEmail(),
                        password: hashSync(student.user.getPassword(), 10),
                        role: student.user.isStudent() ? Role.STUDENT : Role.PROFESSOR,
                    }
                }
            },
        })

        student.setUserId(studentPrisma.userId);
        student.setId(studentPrisma.id);
        return student;
    }

    async get(id: string): Promise<IStudent> {
        const studentPrisma = await prisma.student.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
            }
        })

        if (!studentPrisma) {
            throw HttpException.NotFoundError("Student not found");
        }

        const student = new Student(
            new User(
                studentPrisma.user.name,
                studentPrisma.user.email,
                studentPrisma.user.password,
                studentPrisma.user.role,
                studentPrisma.user.id
            ),
            studentPrisma.birthDate.toString(),
            studentPrisma.ra,
            studentPrisma.id
        );

        return student;
    }
    
    async getByUserId(id: string): Promise<IStudent> {
        const studentPrisma = await prisma.student.findUnique({
            where: {
                userId: id,
            },
            include: {
                user: true,
            }
        })

        if (!studentPrisma) {
            throw HttpException.NotFoundError("Student not found");
        }

        const student = new Student(
            new User(
                studentPrisma.user.name,
                studentPrisma.user.email,
                studentPrisma.user.password,
                studentPrisma.user.role,
                studentPrisma.user.id
            ),
            studentPrisma.birthDate.toString(),
            studentPrisma.ra,
            studentPrisma.id
        );

        return student;
    }

    async getAll(): Promise<IStudent[]> {
        const studentPrisma = await prisma.student.findMany({
            include:{
                user: true,
            }
        });
        Student.studentList = studentPrisma.map((student) => {
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

        return Student.studentList;
    }

    async update(id: string, birthDate?: string, ra?: string, name?: string, email?: string, password?: string): Promise<IStudent> {
        let studentPrisma = await this.get(id);

        if (!studentPrisma) {
            throw HttpException.NotFoundError("Student not found");
        }

        let student = await prisma.student.update({
            where: {
                id: studentPrisma.getId(),
            },
            data: {
                ra: (typeof ra == "string") ? ra : studentPrisma.getRa(),
                birthDate: (typeof birthDate == "string") ? birthDate : studentPrisma.getBirthDate(),
                user: {
                    update: {
                        where: {
                            id: studentPrisma.getUserId(),
                        },
                        data: {
                            name: (typeof name == "string") ? name : studentPrisma.user.getName(),
                            email: (typeof email == "string") ? email : studentPrisma.user.getEmail(),
                            password: (typeof password == "string") ? hashSync(password, 10) : studentPrisma.user.getPassword(),
                        }
                    }
                }
            },
            include: {
                user: true,
            }
        })

        studentPrisma.setRa(student.ra);
        studentPrisma.setBirthDate(student.ra);
        studentPrisma.user.setName(student.user.name);
        studentPrisma.user.setEmail(student.user.email);
        studentPrisma.user.setPassword(student.user.password);
        return studentPrisma;
    }

    async delete(id: string): Promise<string> {
        let studentPrisma = await this.get(id);

        if (!studentPrisma) {
            throw HttpException.NotFoundError("Student not found");
        }

        let user = await prisma.student.delete({
            where: {
                id: studentPrisma.getId(),
            }
        })

        return user.id.toString();
    }

}