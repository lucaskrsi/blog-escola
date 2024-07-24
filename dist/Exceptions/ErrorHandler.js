"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
// @ts-ignore
const ZodExceptionHandler_1 = require("./ZodExceptionHandler");
const HttpException_1 = require("./HttpException");
// @ts-ignore
const PrismaExceptionHandler_1 = require("./PrismaExceptionHandler");
class ErrorHandler {
    static handler(error) {
        if (error instanceof zod_1.ZodError) {
            error = ZodExceptionHandler_1.ZodExceptionHandler.handleError(error);
        }
        if (error instanceof HttpException_1.HttpException) {
            error = HttpException_1.HttpException.handleError(error);
        }
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            error = PrismaExceptionHandler_1.PrismaExceptionHandler.handleError(error.code);
        }
        return error;
    }
}
exports.ErrorHandler = ErrorHandler;
