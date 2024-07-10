import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { makeUserRepository } from "../../../repositories/factory/makeUserRepository";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const userRepository = makeUserRepository();
        const userId = await userRepository.delete(id);
        res.status(200).json({
            data: { userId: userId },
            message: 'Deleted successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}