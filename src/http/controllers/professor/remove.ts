import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const professorRepository = makeProfessorRepository();
        const professorId = await professorRepository.delete(id);
        res.status(200).json({
            data: { professorId: professorId },
            message: 'Deleted successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}