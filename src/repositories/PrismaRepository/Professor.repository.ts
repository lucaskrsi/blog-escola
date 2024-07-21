import { hashSync } from "bcrypt";
import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { Role } from "@prisma/client";
import { User } from "../../models/User";
import { IProfessor } from "../../models/interfaces/Professor.interface";
import { IProfessorRepository } from "../interfaces/Professor.repository.interface";
import { Professor } from "../../models/Professor";

export class ProfessorRepository implements IProfessorRepository {

    async create(professor: IProfessor): Promise<IProfessor> {
        let userAlreadyExists = await prisma.user.findUnique({
            where: {
                email: professor.user.getEmail(),
            },
        })

        if (userAlreadyExists) {
            throw HttpException.ConflictError("User already exists");
        }

        let professorPrisma = await prisma.professor.create({
            data: {
                professorNumber: professor.getProfessorNumber(),
                user: {
                    create: {
                        name: professor.user.getName(),
                        email: professor.user.getEmail(),
                        password: hashSync(professor.user.getPassword(), 10),
                        role: professor.user.isStudent() ? Role.STUDENT : Role.PROFESSOR,
                    }
                }
            },
        })

        professor.setUserId(professorPrisma.userId);
        professor.setId(professorPrisma.id);
        return professor;
    }

    async get(id: string): Promise<IProfessor> {
        const professorPrisma = await prisma.professor.findUnique({
            where: {
                id: id,
            },
            include: {
                user: true,
            }
        })

        if (!professorPrisma) {
            throw HttpException.NotFoundError("Professor not found");
        }

        const professor = new Professor(
            new User(
                professorPrisma.user.name,
                professorPrisma.user.email,
                professorPrisma.user.password,
                professorPrisma.user.role,
                professorPrisma.user.id
            ),
            professorPrisma.professorNumber,
            professorPrisma.id
        );

        return professor;
    }

    async getAll(): Promise<IProfessor[]> {
        const professorPrisma = await prisma.professor.findMany({
            include:{
                user: true,
            }
        });
        Professor.professorList = professorPrisma.map((professor) => {
            return new Professor(
                new User(
                    professor.user.name,
                    professor.user.email,
                    professor.user.password,
                    professor.user.role,
                    professor.user.id
                ),
                professor.professorNumber,
                professor.id
            );
        });

        return Professor.professorList;
    }

    async update(id: string, professorNumber?: number, name?: string, email?: string, password?: string): Promise<IProfessor> {
        let professorPrisma = await this.get(id);

        if (!professorPrisma) {
            throw HttpException.NotFoundError("Professor not found");
        }

        let professor = await prisma.professor.update({
            where: {
                id: professorPrisma.getId(),
            },
            data: {
                professorNumber: (typeof professorNumber == "number") ? professorNumber : professorPrisma.getProfessorNumber(),
                user: {
                    update: {
                        where: {
                            id: professorPrisma.getUserId(),
                        },
                        data: {
                            name: (typeof name == "string") ? name : professorPrisma.user.getName(),
                            email: (typeof email == "string") ? email : professorPrisma.user.getEmail(),
                            password: (typeof password == "string") ? hashSync(password, 10) : professorPrisma.user.getPassword(),
                        }
                    }
                }
            },
            include: {
                user: true,
            }
        })

        professorPrisma.setProfessorNumber(professor.professorNumber);
        professorPrisma.user.setName(professor.user.name);
        professorPrisma.user.setEmail(professor.user.email);
        professorPrisma.user.setPassword(professor.user.password);
        professorPrisma.user.setRole(professor.user.role);
        return professorPrisma;
    }

    async delete(id: string): Promise<string> {
        let professorPrisma = await this.get(id);

        if (!professorPrisma) {
            throw HttpException.NotFoundError("Professor not found");
        }

        let user = await prisma.professor.delete({
            where: {
                id: professorPrisma.getId(),
            }
        })

        return user.id.toString();
    }

}