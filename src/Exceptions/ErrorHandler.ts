import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
// @ts-ignore
import { ZodExceptionHandler } from "./ZodExceptionHandler";
import { HttpException } from "./HttpException";
// @ts-ignore
import { PrismaExceptionHandler } from "./PrismaExceptionHandler";

export class ErrorHandler {
    public static handler(error: Error){
        if(error instanceof ZodError){
            error = ZodExceptionHandler.handleError(error);
        }

        if(error instanceof HttpException){
            error =  HttpException.handleError(error);
        }

        if(error instanceof Prisma.PrismaClientKnownRequestError){
            error =  PrismaExceptionHandler.handleError(error.code);
        }

        return error;
    }
}