export class HttpException extends Error {
    public name: string = "HttpException";
    public errorCode: number | string = "H500";
    public statusCode: number = 500;

    constructor(message: string, errorCode: number | string, statusCode: number) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }

    public static handleError(error: HttpException) {
        return error;
    }

    public static MultipleChoicesError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H300", 300);
    }
    
    public static MovedPermanentlyError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H301", 301);
    }
    
    public static BadRequestError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H400", 400);
    }
    
    public static UnauthorizedError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H401", 401);
    }
    
    public static ForbiddenError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H403", 403);
    }
   
    public static NotFoundError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H404", 404);
    }
    
    public static MethodNotAllowedError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H405", 405);
    }
    
    public static NotAccesptableError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H406", 406);
    }
    
    public static RequestTimeoutError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H408", 408);
    }
    
    public static ConflictError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H409", 409);
    }
    
    public static PayloadTooLargeError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H413", 413);
    }
    
    public static UnprocessableContentError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H422", 422);
    }
    
    public static TooManyRequestsError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H429", 429);
    }
    
    public static InternalServerError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H500", 500);
    }
    
    public static NotImplementedError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H501", 501);
    }
    
    public static BadGatewayError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H502", 502);
    }
    
    public static ServiceUnavaliableError(message?: string | undefined, errorCode?: string | number | undefined): HttpException {
        return new HttpException(message, errorCode ?? "H503", 503);
    }   
}