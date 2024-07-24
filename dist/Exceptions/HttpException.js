"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode) {
        super(message);
        this.name = "HttpException";
        this.errorCode = "H500";
        this.statusCode = 500;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
    static handleError(error) {
        return error;
    }
    static MultipleChoicesError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H300", 300);
    }
    static MovedPermanentlyError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H301", 301);
    }
    static BadRequestError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H400", 400);
    }
    static UnauthorizedError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H401", 401);
    }
    static ForbiddenError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H403", 403);
    }
    static NotFoundError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H404", 404);
    }
    static MethodNotAllowedError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H405", 405);
    }
    static NotAccesptableError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H406", 406);
    }
    static RequestTimeoutError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H408", 408);
    }
    static ConflictError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H409", 409);
    }
    static PayloadTooLargeError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H413", 413);
    }
    static UnprocessableContentError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H422", 422);
    }
    static TooManyRequestsError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H429", 429);
    }
    static InternalServerError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H500", 500);
    }
    static NotImplementedError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H501", 501);
    }
    static BadGatewayError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H502", 502);
    }
    static ServiceUnavaliableError(message, errorCode) {
        return new HttpException(message, errorCode !== null && errorCode !== void 0 ? errorCode : "H503", 503);
    }
}
exports.HttpException = HttpException;
