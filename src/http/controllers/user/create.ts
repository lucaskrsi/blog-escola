import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { User } from "../../../models/User";
import { ErrorHandler } from "../../../Exceptions/ErrorHandler";
import { makeUserRepository } from "../../../repositories/factory/makeUserRepository";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            name: z.string().max(80),
            email: z.string().email(),
            password: z.string(),
            role: z.string()
        });

        const { name, email, password, role } = createBody.parse(req.body);
        
        const userRepository = makeUserRepository();

        const user = await userRepository.create(new User(name, email, password, role));
        res.status(201).json({
            data: { userId: user.getId() },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}