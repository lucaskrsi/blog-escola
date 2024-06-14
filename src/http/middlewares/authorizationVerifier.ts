import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { HttpException } from "../../Exceptions/HttpException";
import { TokenUser } from "../../controller/TokenUser";
import { ErrorHandler } from "../../Exceptions/ErrorHandler";

export async function authorizationVerifier(req: Request, res: Response, next: NextFunction) {
    try {

        const authToken = req.headers.authorization;
        const [, token] = authToken.split(" ");
        const role = await TokenUser.validateToken(token);
        if (role === 'PROFESSOR') {
            return next();
        } else {
            throw HttpException.ForbiddenError('Access forbidden');
        }
    } catch (e) {
        next(ErrorHandler.handler(e));
    }

}