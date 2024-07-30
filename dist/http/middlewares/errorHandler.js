"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var errorHandler = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({ error: true, message: error.message || "Internal server error" });
};
exports.errorHandler = errorHandler;
