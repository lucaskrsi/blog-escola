import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";
import { Class } from "../../../models/Class";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            name: z.string().max(80),
        });

        const { name } = createBody.parse(req.body);

        const classRepository = makeClassRepository();

        const classObject = await classRepository.create(new Class(name));
        res.status(201).json({
            data: { 
                classId: classObject.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}