"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationVerifier = void 0;
const HttpException_1 = require("../../Exceptions/HttpException");
const TokenUser_1 = require("../../controller/TokenUser");
const ErrorHandler_1 = require("../../Exceptions/ErrorHandler");
function authorizationVerifier(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authToken = req.headers.authorization;
            const [, token] = authToken.split(" ");
            const role = yield TokenUser_1.TokenUser.validateToken(token);
            if (role === 'PROFESSOR') {
                return next();
            }
            else {
                throw HttpException_1.HttpException.ForbiddenError('Access forbidden');
            }
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.authorizationVerifier = authorizationVerifier;
