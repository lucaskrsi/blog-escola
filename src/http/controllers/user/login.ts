import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { makeUserRepository } from "../../../repositories/factory/makeUserRepository";
import { TokenUser } from "../../../utils/TokenUser";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            email: z.string().email(),
            password: z.string()
        });

        const { email, password } = createBody.parse(req.body);
        const userRepository = makeUserRepository();
        const { token, user } = await userRepository.executeAuthentication(email, password);
        const refreshToken = await TokenUser.generateRefreshToken(user.getId());
        res.status(200).json({
            data: {
                token,
                refreshToken,
            }
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}