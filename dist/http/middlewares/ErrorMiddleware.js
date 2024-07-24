"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
class ErrorMiddleware {
    static errorHandler(error, req, res, next) {
        res.status(error.statusCode || 500).json({ error: true, message: error.message || "Internal Server Error" });
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
