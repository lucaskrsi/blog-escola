import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            name: z.optional(z.string().max(80)),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { name } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const classRepository = makeClassRepository();
        const classObject = await classRepository.update(id, name);
        res.status(201).json({
            data: { classId: classObject.getId() },
            message: 'Updated successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}