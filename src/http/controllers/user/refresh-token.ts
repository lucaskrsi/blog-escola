import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../Exceptions/ErrorHandler";
import { TokenUser } from "../../../utils/TokenUser";

export async function refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            refreshTokenId: z.string().max(36),
        });

        const { refreshTokenId } = createBody.parse(req.body);

        const { token, newRefreshToken } = await TokenUser.refreshToken(refreshTokenId);
        res.status(201).json({
            data: {
                token,
                newRefreshToken: newRefreshToken,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}