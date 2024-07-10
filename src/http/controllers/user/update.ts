import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../Exceptions/ErrorHandler";
import { makeUserRepository } from "../../../repositories/factory/makeUserRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            name: z.optional(z.string().max(80)),
            email: z.optional(z.string().email()),
            password: z.optional(z.string()),
            role: z.optional(z.string()),
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { name, email, password, role } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const userRepository = makeUserRepository();
        const user = await userRepository.update(id, name, email, password, role);
        res.status(201).json({
            data: { userId: user.getId() },
            message: 'Updated successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}