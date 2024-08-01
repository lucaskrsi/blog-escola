import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeStudentRepository } from "../../../repositories/factory/makeStudentRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            birthDate: z.optional(z.string()),
            ra: z.optional(z.string()),
            name: z.optional(z.string().max(80)),
            email: z.optional(z.string().email()),
            password: z.optional(z.string()),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { birthDate, ra, name, email, password } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const studentRepository = makeStudentRepository();
        const student = await studentRepository.update(id, birthDate, ra, name, email, password);
        res.status(200).json({
            data: { studentId: student.getId() },
            message: 'Updated successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}