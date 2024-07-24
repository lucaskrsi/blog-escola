import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";
import { makeStudentRepository } from "../../../repositories/factory/makeStudentRepository";

export async function removeStudents(req: Request, res: Response, next: NextFunction) {
    try {
        const createStudentSchema = z.object({
            studentId: z.string().max(36),
        });

        const createParam = z.object({
            id: z.string().max(36),
        });

        const createBody = z.array(createStudentSchema);

        const studentListToAdd = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);


        const studentRepository = makeStudentRepository();
        const classRepository = makeClassRepository();


        let classObject = await classRepository.get(id);

        for (let student of studentListToAdd) {
            let studentObject = await studentRepository.get(student.studentId);
            classObject = await classRepository.removeStudent(classObject, studentObject);

        }

        let studentList = classObject.getStudents().map(student => {
            return {
                id: student.getId(),
                name: student.user.getName(),
                email: student.user.getEmail(),
            }
        });

        let classObjectFiltered = {
            id: classObject.getId(),
            name: classObject.getName(),
            students: studentList
        };

        res.status(200).json({
            data: {
                class: {
                    classObjectFiltered,
                },
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}