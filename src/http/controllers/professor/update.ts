import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            professorNumber: z.optional(z.number()),
            name: z.optional(z.string().max(80)),
            email: z.optional(z.string().email()),
            password: z.optional(z.string()),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { professorNumber, name, email, password } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const professorRepository = makeProfessorRepository();
        const professor = await professorRepository.update(id, professorNumber, name, email, password);
        res.status(200).json({
            data: { professorId: professor.getId() },
            message: 'Updated successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}