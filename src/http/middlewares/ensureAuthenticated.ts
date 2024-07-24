import { Request, Response, NextFunction } from "express";
import { HttpException } from "../../exceptions/HttpException";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;

    if(!authToken){
        throw HttpException.UnauthorizedError("Token is missing");
    }

    const [, token] = authToken.split(" ");

    try{
        verify(token, process.env.JWT_KEY);
        return next();
    }catch(e){
        throw HttpException.UnauthorizedError("Token invalid");
    }
}