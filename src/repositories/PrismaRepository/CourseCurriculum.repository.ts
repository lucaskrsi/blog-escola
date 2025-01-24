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
import { ICourseCurriculum } from "../../models/interfaces/CourseCurriculum.interface";
import { CourseCurriculum } from "../../models/CourseCurriculum";
import { ICourseCurriculumRepository } from "../../repositories/interfaces/CourseCurriculum.respository.interface";

export class CourseCurriculumRepository implements ICourseCurriculumRepository {

    async create(courseCurriculum: ICourseCurriculum): Promise<ICourseCurriculum> {

        let courseCurriculumPrisma = await prisma.courseCurriculum.create({
            data: {
                name: courseCurriculum.getName(),
            },
        })

        courseCurriculum.setId(courseCurriculumPrisma.id);
        return courseCurriculum;
    }

    async get(id: string): Promise<ICourseCurriculum> {
        const courseCurriculumPrisma = await prisma.courseCurriculum.findUnique({
            where: {
                id: id,
            },
        })

        if (!courseCurriculumPrisma) {
            throw HttpException.NotFoundError("Course curriculum not found");
        }

        const courseCurriculum = new CourseCurriculum(
            courseCurriculumPrisma.name,
            courseCurriculumPrisma.id
        );

        return courseCurriculum;
    }

    async getAll(): Promise<ICourseCurriculum[]> {
        const courseCurriculumPrisma = await prisma.courseCurriculum.findMany();
        CourseCurriculum.courseCurriculumList = courseCurriculumPrisma.map((courseCurriculumObject) => {
            return new CourseCurriculum(
                courseCurriculumObject.name,
                courseCurriculumObject.id
            );
        });

        return CourseCurriculum.courseCurriculumList;
    }

    async update(id: string, name?: string): Promise<ICourseCurriculum> {
        let courseCurriculumPrisma = await this.get(id);

        if (!courseCurriculumPrisma) {
            throw HttpException.NotFoundError("Course curriculum not found");
        }

        let courseCurriculumObject = await prisma.courseCurriculum.update({
            where: {
                id: courseCurriculumPrisma.getId(),
            },
            data: {
                name: (typeof name == "string") ? name : courseCurriculumPrisma.getName(),
            }
        })

        courseCurriculumPrisma.setName(courseCurriculumObject.name);
        return courseCurriculumPrisma;
    }

    async delete(id: string): Promise<string> {
        let courseCurriculumPrisma = await this.get(id);

        if (!courseCurriculumPrisma) {
            throw HttpException.NotFoundError("Course curriculum not found");
        }

        let courseCurriculum = await prisma.courseCurriculum.delete({
            where: {
                id: courseCurriculumPrisma.getId(),
            }
        })

        return courseCurriculum.id.toString();
    }

}