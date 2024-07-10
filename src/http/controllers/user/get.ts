import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../Exceptions/ErrorHandler";
import { makeUserRepository } from "../../../repositories/factory/makeUserRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const userRepository = makeUserRepository();
        const user = await userRepository.get(id);
        res.status(200).json({
            data: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}