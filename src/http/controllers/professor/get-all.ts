import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const professorRepository = makeProfessorRepository();
        const professorList = await professorRepository.getAll();
        let list = professorList.map(professor => {
            return {
                id: professor.getId(),
                birthDate: professor.getProfessorNumber(),
                user:{
                    id: professor.user.getId(),
                    name: professor.user.getName(),
                    email: professor.user.getEmail()
                }
            };
        });
        res.status(201).json({
            data: {
                professors: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}