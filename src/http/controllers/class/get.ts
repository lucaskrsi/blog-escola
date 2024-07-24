import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const classRepository = makeClassRepository();
        const classObject = await classRepository.get(id);
        let students = await classRepository.getStudents(classObject);
            let studentsList = students.map(student => {
                return {
                    id: student.getId(),
                    name: student.user.getName(), 
                    email: student.user.getEmail(),
                }
            });

        res.status(200).json({
            data: {
                class: {
                    id: classObject.getId(),
                    name: classObject.getName(),
                    students: studentsList
                }
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}