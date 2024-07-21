import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { User } from "../../../models/User";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";
import { Professor } from "../../../models/Professor";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            professorNumber: z.coerce.number(),
            name: z.string().max(80),
            email: z.string().email(),
            password: z.string(),
        });

        const { name, email, password, professorNumber } = createBody.parse(req.body);

        const professorRepository = makeProfessorRepository();

        const professor = await professorRepository.create(new Professor(new User(name, email, password, User.professorRole), professorNumber));
        res.status(201).json({
            data: { 
                professorId: professor.getId(),
                userId: professor.getUserId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}