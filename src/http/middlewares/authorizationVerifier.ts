import { Request, Response, NextFunction } from "express";
import { decode } from "jsonwebtoken";
import { HttpException } from "../../Exceptions/HttpException";

export function authorizationVerifier(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;
    const [, token] = authToken.split(" ");
    const decodedToken = decode(token);
    throw HttpException.BadGatewayError(decodedToken.toString());
    // if (user.getRole() === 'PROFESSOR') {
    //     next();
    // } else {
    //     res.status(403).send('Forbidden');
    // }
    
}