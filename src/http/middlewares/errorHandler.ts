import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../Exceptions/HttpException";

    export var errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) =>{
        res.status(error.statusCode || 500).json({error:true, message: error.message || "Internal Server Error"});
    }