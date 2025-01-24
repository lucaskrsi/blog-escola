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
import { IProfessorAvaliability } from "../../models/interfaces/ProfessorAvaliability.interface";
import { IProfessorAvaliabilityRepository } from "../../repositories/interfaces/ProfessorAvaliability.respository.interface";
import { IProfessor } from "../../models/interfaces/Professor.interface";
import { ProfessorAvaliability } from "../../models/ProfessorAvailability";

export class ProfessorAvaliabilityRepository implements IProfessorAvaliabilityRepository {

    async create(professorAvaliability: IProfessorAvaliability): Promise<IProfessorAvaliability> {

        let professorAvaliabilityPrisma = await prisma.professorAvaliability.create({
            data: {
                professorId: professorAvaliability.getProfessor().getId(),
                dayOfWeek: professorAvaliability.getDayOfWeek(),
                startTime: professorAvaliability.getStartTime(),
                endTime: professorAvaliability.getEndTime(),
            },
        })

        professorAvaliability.setId(professorAvaliabilityPrisma.id);
        return professorAvaliability;
    }

    async get(id: string): Promise<IProfessorAvaliability> {
        const professorAvaliabilityPrisma = await prisma.professorAvaliability.findUnique({
            where: {
                id: id,
            },
            include: {
                professor: {
                    include: {
                        user: true,
                    }
                }
            }
        })

        if (!professorAvaliabilityPrisma) {
            throw HttpException.NotFoundError("Professor avaliability not found");
        }

        const professorAvaliability = new ProfessorAvaliability(
            new Professor(
                new User(
                    professorAvaliabilityPrisma.professor.user.name,
                    professorAvaliabilityPrisma.professor.user.email,
                    professorAvaliabilityPrisma.professor.user.password,
                    professorAvaliabilityPrisma.professor.user.role,
                    professorAvaliabilityPrisma.professor.user.id
                ),
                professorAvaliabilityPrisma.professor.professorNumber,
                professorAvaliabilityPrisma.professor.user.id
            ),
            professorAvaliabilityPrisma.dayOfWeek,
            professorAvaliabilityPrisma.startTime,
            professorAvaliabilityPrisma.endTime,
        );

        return professorAvaliability;
    }

    async getAll(): Promise<IProfessorAvaliability[]> {
        const professorAvaliabilityPrisma = await prisma.professorAvaliability.findMany({
            include: {
                professor: {
                    include: {
                        user: true,
                    }
                }
            }
        });

        ProfessorAvaliability.professorAvaliabilityList = professorAvaliabilityPrisma.map((professorAvaliabilityObject) => {
            return new ProfessorAvaliability(
                new Professor(
                    new User(
                        professorAvaliabilityObject.professor.user.name,
                        professorAvaliabilityObject.professor.user.email,
                        professorAvaliabilityObject.professor.user.password,
                        professorAvaliabilityObject.professor.user.role,
                        professorAvaliabilityObject.professor.user.id
                    ),
                    professorAvaliabilityObject.professor.professorNumber,
                    professorAvaliabilityObject.professor.user.id
                ),
                professorAvaliabilityObject.dayOfWeek,
                professorAvaliabilityObject.startTime,
                professorAvaliabilityObject.endTime,
            );
        });

        return ProfessorAvaliability.professorAvaliabilityList;
    }

    async update(id: string, professor?: IProfessor, dayOfWeek?: number, startTime?: string, endTime?: string): Promise<IProfessorAvaliability> {
        let professorAvaliabilityPrisma = await this.get(id);

        if (!professorAvaliabilityPrisma) {
            throw HttpException.NotFoundError("Professor avaliability not found");
        }

        let professorAvaliabilityObject = await prisma.professorAvaliability.update({
            where: {
                id: professorAvaliabilityPrisma.getId(),
            },
            data: {
                professorId: (professor && typeof professor.getId === "string")? professor.getId() : professorAvaliabilityPrisma.getProfessor().getId(),
                dayOfWeek: (dayOfWeek && typeof dayOfWeek === "number")? dayOfWeek : professorAvaliabilityPrisma.getDayOfWeek(),
                startTime: (startTime && typeof startTime === "string")? startTime : professorAvaliabilityPrisma.getStartTime(),
                endTime: (endTime && typeof endTime === "string")? endTime : professorAvaliabilityPrisma.getEndTime(),
            }
        })

        professorAvaliabilityPrisma.setDayOfWeek(professorAvaliabilityObject.dayOfWeek);
        professorAvaliabilityPrisma.setStartTime(professorAvaliabilityObject.startTime.toString());
        professorAvaliabilityPrisma.setEndTime(professorAvaliabilityObject.endTime.toString());
        professorAvaliabilityPrisma.setEndTime(professorAvaliabilityObject.endTime.toString());
        return professorAvaliabilityPrisma;
    }

    async delete(id: string): Promise<string> {
        let professorAvaliabilityPrisma = await this.get(id);

        if (!professorAvaliabilityPrisma) {
            throw HttpException.NotFoundError("Professor avaliability not found");
        }

        let professorAvaliability = await prisma.professorAvaliability.delete({
            where: {
                id: professorAvaliabilityPrisma.getId(),
            }
        })

        return professorAvaliability.id.toString();
    }

}