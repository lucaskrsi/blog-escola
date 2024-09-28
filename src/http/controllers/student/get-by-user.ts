import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeStudentRepository } from "../../../repositories/factory/makeStudentRepository";

export async function getByUser(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const studentRepository = makeStudentRepository();
        const student = await studentRepository.getByUserId(id);
        res.status(200).json({
            data: {
                student: {
                    id: student.getId(),
                    birthDate: student.getBirthDate(),
                    ra: student.getRa(),
                    user: {
                        id: student.user.getId(),
                        name: student.user.getName(),
                        email: student.user.getEmail(),
                    }
                }
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}