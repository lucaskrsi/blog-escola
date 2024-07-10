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
exports.login = void 0;
const zod_1 = require("zod");
const makeUserRepository_1 = require("../../../repositories/factory/makeUserRepository");
const TokenUser_1 = require("../../../utils/TokenUser");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                email: zod_1.z.string().email(),
                password: zod_1.z.string()
            });
            const { email, password } = createBody.parse(req.body);
            const userRepository = (0, makeUserRepository_1.makeUserRepository)();
            const { token, user } = yield userRepository.executeAuthentication(email, password);
            const refreshToken = yield TokenUser_1.TokenUser.generateRefreshToken(user.getId());
            res.status(201).json({
                data: {
                    token,
                    refreshToken,
                }
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.login = login;
