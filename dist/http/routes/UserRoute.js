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
exports.user = void 0;
const User_1 = require("../../model/User");
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../Exceptions/ErrorHandler");
const TokenUser_1 = require("../../controller/TokenUser");
class UserRoute {
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBody = zod_1.z.object({
                    email: zod_1.z.string().email(),
                    password: zod_1.z.string()
                });
                const { email, password } = createBody.parse(req.body);
                const { token, user } = yield User_1.User.executeAuthentication(email, password);
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
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBody = zod_1.z.object({
                    refreshTokenId: zod_1.z.string().max(36),
                });
                const { refreshTokenId } = createBody.parse(req.body);
                const { token, newRefreshToken } = yield TokenUser_1.TokenUser.refreshToken(refreshTokenId);
                res.status(201).json({
                    data: {
                        token,
                        newRefreshToken: newRefreshToken,
                    },
                });
            }
            catch (e) {
                next(ErrorHandler_1.ErrorHandler.handler(e));
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBody = zod_1.z.object({
                    name: zod_1.z.string().max(80),
                    email: zod_1.z.string().email(),
                    password: zod_1.z.string(),
                    role: zod_1.z.string()
                });
                const { name, email, password, role } = createBody.parse(req.body);
                const user = yield User_1.User.create(name, email, password, role);
                res.status(201).json({
                    data: { userId: user.getId() },
                });
            }
            catch (e) {
                next(ErrorHandler_1.ErrorHandler.handler(e));
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBody = zod_1.z.object({
                    name: zod_1.z.optional(zod_1.z.string().max(80)),
                    email: zod_1.z.optional(zod_1.z.string().email()),
                    password: zod_1.z.optional(zod_1.z.string()),
                    role: zod_1.z.optional(zod_1.z.string()),
                });
                const createParam = zod_1.z.object({
                    id: zod_1.z.string().max(36),
                });
                const { name, email, password, role } = createBody.parse(req.body);
                const { id } = createParam.parse(req.params);
                const user = yield User_1.User.update(id, name, email, password, role);
                res.status(201).json({
                    data: { userId: user.getId() },
                    message: 'Updated successfully',
                });
            }
            catch (e) {
                next(ErrorHandler_1.ErrorHandler.handler(e));
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createParam = zod_1.z.object({
                    id: zod_1.z.string().max(36),
                });
                const { id } = createParam.parse(req.params);
                const userId = yield User_1.User.delete(id);
                res.status(200).json({
                    data: { userId: userId },
                    message: 'Deleted successfully',
                });
            }
            catch (e) {
                next(ErrorHandler_1.ErrorHandler.handler(e));
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createParam = zod_1.z.object({
                    id: zod_1.z.string().max(36),
                });
                const { id } = createParam.parse(req.params);
                const user = yield User_1.User.get(id);
                res.status(200).json({
                    data: {
                        id: user.getId(),
                        name: user.getName(),
                        email: user.getEmail(),
                        role: user.getRole(),
                    },
                });
            }
            catch (e) {
                next(ErrorHandler_1.ErrorHandler.handler(e));
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userList = yield User_1.User.getAll();
                let list = userList.map(user => {
                    return {
                        id: user.getId(),
                        name: user.getName(),
                        email: user.getEmail(),
                        role: user.getRole(),
                    };
                });
                res.status(201).json({
                    data: {
                        users: list,
                    },
                });
            }
            catch (e) {
                next(ErrorHandler_1.ErrorHandler.handler(e));
            }
        });
    }
}
exports.user = new UserRoute();
