import { hashSync } from "bcrypt";
import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IStudent } from "../../models/interfaces/Student.interface";
import { IStudentRepository } from "../interfaces/Student.repository.interface";
import { Role } from "@prisma/client";

export class StudentRepository implements IStudentRepository {
    create(user: IStudent): Promise<IStudent> {
        throw new Error("Method not implemented.");
    }
    async get(id: string): Promise<IStudent> {
        throw new Error("Method not implemented.");
    }
    async getByEmail(email: string): Promise<IStudent> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<IStudent[]> {
        throw new Error("Method not implemented.");
    }
    // async create(student: IStudent): Promise<IStudent> {
    //     // let userAlreadyExists = await this.getByEmail(student.user.getEmail());

    //     // if (userAlreadyExists) {
    //     //     throw HttpException.ConflictError("User already exists");
    //     // }

    //     // // let userPrisma = await prisma.user.create({
    //     // //     data:{

    //     // //         user: {
    //     // //             name: student.user.getName(),
    //     // //             email: student.user.getEmail(),
    //     // //             password: hashSync(student.user.getPassword(), 10),
    //     // //             role: student.user.isStudent() ? Role.STUDENT : Role.PROFESSOR,
    //     // //         },
    //     // //     },
    //     // // })

    //     // student.user.setId(userPrisma.id);
    //     // return student;
    // }
    async update(id: string, name?: string, email?: string, password?: string, role?: string): Promise<IStudent> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}