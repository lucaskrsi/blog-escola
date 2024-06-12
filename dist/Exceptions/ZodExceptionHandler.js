"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodExceptionHandler = void 0;
const HttpException_1 = require("./HttpException");
class ZodExceptionHandler {
    static handleError(error) {
        switch (error.issues[0].code) {
            case "invalid_type":
                return HttpException_1.HttpException.BadRequestError("Invalid types in sent arguments", "Z001");
            case "unrecognized_keys":
                return HttpException_1.HttpException.BadRequestError("Unrecognized keys of sent object", "Z002");
            case "invalid_arguments":
                return HttpException_1.HttpException.BadRequestError("Invalid Arguments", "Z003");
            case "invalid_date":
                return HttpException_1.HttpException.BadRequestError("Invalid date", "Z004");
            case "invalid_string":
                return HttpException_1.HttpException.BadRequestError("Invalid string", "Z005");
            case "too_small":
                return HttpException_1.HttpException.BadRequestError("An argument that you had sent is too small for the field", "Z006");
            case "too_big":
                return HttpException_1.HttpException.BadRequestError("An argument that you had sent is too big for the field", "Z007");
            default:
                return HttpException_1.HttpException.BadRequestError("Invalid arguments", "Z008");
        }
    }
}
exports.ZodExceptionHandler = ZodExceptionHandler;
