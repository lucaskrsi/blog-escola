import { HttpException } from "./HttpException";
import { ZodError } from "zod";

export class  ZodExceptionHandler{
    public static handleError(error: ZodError){
        switch (error.issues[0].code) {
            case "invalid_type":
                return HttpException.BadRequestError("Invalid types in sent arguments", "Z001");
            case "unrecognized_keys":
                return HttpException.BadRequestError("Unrecognized keys of sent object", "Z002");
            case "invalid_arguments":
                return HttpException.BadRequestError("Invalid Arguments", "Z003");
            case "invalid_date":
                return HttpException.BadRequestError("Invalid date", "Z004");
            case "invalid_string":
                return HttpException.BadRequestError("Invalid string", "Z005");
            case "too_small":
                return HttpException.BadRequestError("An argument that you had sent is too small for the field", "Z006");
            case "too_big":
                return HttpException.BadRequestError("An argument that you had sent is too big for the field", "Z007");
            default:
                return HttpException.BadRequestError("Invalid arguments", "Z008");
        }
    }
}