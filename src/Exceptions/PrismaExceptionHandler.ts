import { HttpException } from "./HttpException";

export class  PrismaExceptionHandler{
    public static handleError(code: string){
        switch (code) {
            case "P1008":
                return HttpException.RequestTimeoutError("Operations timed out after {time}", code);
            case "P2000":
                return HttpException.UnprocessableContentError("Provided value is too long", code);
            case "P2001":
                return HttpException.BadRequestError("Searched parameter does not exist", code);
            case "P2002":
                return HttpException.ConflictError("There is a unique constraint violation, a new user cannot be created with this email", code);
            case "P2018":
                return HttpException.NotFoundError("The required connected records were not found. {details}", code);
            default:
                return HttpException.InternalServerError("An error occurred while trying to conclude the operation", code);
        }
    }
}
