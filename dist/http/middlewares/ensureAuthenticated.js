"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const HttpException_1 = require("../../exceptions/HttpException");
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        throw HttpException_1.HttpException.UnauthorizedError("Token is missing");
    }
    const [, token] = authToken.split(" ");
    try {
        (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY);
        return next();
    }
    catch (e) {
        throw HttpException_1.HttpException.UnauthorizedError("Token invalid");
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
