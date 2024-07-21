import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const professorRepository = makeProfessorRepository();
        const professor = await professorRepository.get(id);
        res.status(200).json({
            data: {
                professor: {
                    id: professor.getId(),
                    professorNumber: professor.getProfessorNumber(),
                    user: {
                        id: professor.user.getId(),
                        name: professor.user.getName(),
                        email: professor.user.getEmail(),
                    }
                }
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}