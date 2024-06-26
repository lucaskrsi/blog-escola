import { Prisma } from "@prisma/client";
import { HttpException } from "./HttpException";
import { PrismaExceptionHandler } from "./PrismaExceptionHandler";
import { ZodError } from "zod";
import {ZodExceptionHandler } from "./ZodExceptionHandler";

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