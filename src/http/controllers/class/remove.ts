import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const classRepository = makeClassRepository();
        const classId = await classRepository.delete(id);
        res.status(200).json({
            data: { classId: classId },
            message: 'Deleted successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}