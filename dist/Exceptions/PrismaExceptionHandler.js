"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaExceptionHandler = void 0;
const HttpException_1 = require("./HttpException");
class PrismaExceptionHandler {
    static handleError(code) {
        switch (code) {
            case "P1008":
                return HttpException_1.HttpException.RequestTimeoutError("Operations timed out after {time}", code);
            case "P2000":
                return HttpException_1.HttpException.UnprocessableContentError("Provided value is too long", code);
            case "P2001":
                return HttpException_1.HttpException.BadRequestError("Searched parameter does not exist", code);
            case "P2002":
                return HttpException_1.HttpException.ConflictError("There is a unique constraint violation, a new user cannot be created with this email", code);
            case "P2018":
                return HttpException_1.HttpException.NotFoundError("The required connected records were not found. {details}", code);
            default:
                return HttpException_1.HttpException.InternalServerError("An error occurred while trying to conclude the operation", code);
        }
    }
}
exports.PrismaExceptionHandler = PrismaExceptionHandler;
