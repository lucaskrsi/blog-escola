class HttpException extends Error {
    public errorCode: number | string = "H500";
    public statusCode: number = 500;

    constructor(message: string, errorCode: number | string, statusCode: number) {
        super(message);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }

    public static MultipleChoicesError(message?: string | undefined): HttpException {
        return new HttpException(message, "H300", 300);
    }
    
    public static MovedPermanentlyError(message?: string | undefined): HttpException {
        return new HttpException(message, "H301", 301);
    }
    
    public static BadRequestError(message?: string | undefined): HttpException {
        return new HttpException(message, "H400", 400);
    }
    
    public static UnauthorizedError(message?: string | undefined): HttpException {
        return new HttpException(message, "H401", 401);
    }
    
    public static ForbiddenError(message?: string | undefined): HttpException {
        return new HttpException(message, "H403", 403);
    }
   
    public static NotFoundError(message?: string | undefined): HttpException {
        return new HttpException(message, "H404", 404);
    }
    
    public static MethodNotAllowedError(message?: string | undefined): HttpException {
        return new HttpException(message, "H405", 405);
    }
    
    public static NotAccesptableError(message?: string | undefined): HttpException {
        return new HttpException(message, "H406", 406);
    }
    
    public static RequestTimeoutError(message?: string | undefined): HttpException {
        return new HttpException(message, "H408", 408);
    }
    
    public static PayloadTooLargeError(message?: string | undefined): HttpException {
        return new HttpException(message, "H413", 413);
    }
    
    public static UnprocessableContentError(message?: string | undefined): HttpException {
        return new HttpException(message, "H422", 422);
    }
    
    public static TooManyRequestsError(message?: string | undefined): HttpException {
        return new HttpException(message, "H429", 429);
    }
    
    public static InternalServerError(message?: string | undefined): HttpException {
        return new HttpException(message, "H500", 500);
    }
    
    public static NotImplementedError(message?: string | undefined): HttpException {
        return new HttpException(message, "H501", 501);
    }
    
    public static BadGatewayError(message?: string | undefined): HttpException {
        return new HttpException(message, "H502", 502);
    }
    
    public static ServiceUnavaliableError(message?: string | undefined): HttpException {
        return new HttpException(message, "H503", 503);
    }   
}