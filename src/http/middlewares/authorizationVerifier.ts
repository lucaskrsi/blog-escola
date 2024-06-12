import { Request, Response, NextFunction } from "express";

export function authorizationVerifier(req: Request, res: Response, next: NextFunction){
    const authToken = req.headers.authorization;
    const [, token] = authToken.split(" ");
    
    if (user.getRole() === 'PROFESSOR') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
    
}