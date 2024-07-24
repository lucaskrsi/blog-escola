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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUser = void 0;
// @ts-ignore
const HttpException_1 = require("../exceptions/HttpException");
const client_1 = require("../database/config/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const dayjs_1 = __importDefault(require("dayjs"));
const zod_1 = require("zod");
const makeUserRepository_1 = require("../repositories/factory/makeUserRepository");
class TokenUser {
    static generateToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, jsonwebtoken_1.sign)({}, process.env.JWT_KEY, {
                subject: userId,
                expiresIn: "18000000s"
            });
        });
    }
    static validateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtPayload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_KEY);
            const createPayload = zod_1.z.object({
                sub: zod_1.z.string().max(36),
            });
            const { sub } = createPayload.parse(jwtPayload);
            const userRepository = (0, makeUserRepository_1.makeUserRepository)();
            const userPrisma = yield userRepository.get(sub);
            if (!userPrisma) {
                throw HttpException_1.HttpException.UnauthorizedError("Token inválido");
            }
            ;
            const role = userPrisma.getRole();
            return role;
        });
    }
    static refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenPrisma = yield client_1.prisma.refreshToken.findFirst({
                where: {
                    id: refreshToken,
                }
            });
            if (!refreshTokenPrisma) {
                throw HttpException_1.HttpException.UnauthorizedError("Refresh token invalid.");
            }
            const userId = refreshTokenPrisma.userId;
            const token = yield TokenUser.generateToken(userId);
            const refreshTokenExpired = TokenUser.checkTokenExpired(refreshTokenPrisma.expiresIn);
            if (refreshTokenExpired) {
                yield client_1.prisma.refreshToken.deleteMany({
                    where: {
                        userId,
                    },
                });
                const newRefreshToken = yield TokenUser.generateRefreshToken(userId);
                return { token, newRefreshToken };
            }
            return { token };
        });
    }
    static generateRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresIn = (0, dayjs_1.default)().add(1, "hour").unix();
            yield client_1.prisma.refreshToken.deleteMany({
                where: {
                    userId: userId,
                },
            });
            const generateRefreshToken = yield client_1.prisma.refreshToken.create({
                data: {
                    userId: userId,
                    expiresIn,
                }
            });
            return generateRefreshToken;
        });
    }
    static checkTokenExpired(expiresIn) {
        const tokenExpired = (0, dayjs_1.default)().isAfter(dayjs_1.default.unix(expiresIn));
        if (tokenExpired) {
            return true;
        }
        return false;
    }
}
exports.TokenUser = TokenUser;
