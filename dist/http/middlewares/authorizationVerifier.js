"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationVerifier = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const HttpException_1 = require("../../Exceptions/HttpException");
function authorizationVerifier(req, res, next) {
    const authToken = req.headers.authorization;
    const [, token] = authToken.split(" ");
    const decodedToken = (0, jsonwebtoken_1.decode)(token);
    throw HttpException_1.HttpException.BadGatewayError(decodedToken.toString());
    // if (user.getRole() === 'PROFESSOR') {
    //     next();
    // } else {
    //     res.status(403).send('Forbidden');
    // }
}
exports.authorizationVerifier = authorizationVerifier;
