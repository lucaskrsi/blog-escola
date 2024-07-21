import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { TokenUser } from "../../utils/TokenUser";
import { User } from "../../models/User";
import { HttpException } from "../../exceptions/HttpException";
// @ts-ignore
import { ErrorHandler } from "../../exceptions/ErrorHandler";

export async function authorizationVerifier(req: Request, res: Response, next: NextFunction) {
    try {

        const authToken = req.headers.authorization;
        const [, token] = authToken.split(" ");
        const role = await TokenUser.validateToken(token);
        if (role === User.professorRole) {
            return next();
        } else {
            throw HttpException.ForbiddenError('Access forbidden');
        }
    } catch (e) {
        next(ErrorHandler.handler(e));
    }

}