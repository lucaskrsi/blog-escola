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
exports.UserRepository = void 0;
const HttpException_1 = require("../../exceptions/HttpException");
const client_1 = require("../../database/config/client");
const User_1 = require("../../models/User");
const bcrypt_1 = require("bcrypt");
const client_2 = require("@prisma/client");
const TokenUser_1 = require("../../utils/TokenUser");
class UserRepository {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPrisma = yield client_1.prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!userPrisma) {
                throw HttpException_1.HttpException.NotFoundError("User not found");
            }
            const user = new User_1.User(userPrisma.name, userPrisma.email, userPrisma.password, userPrisma.role, userPrisma.id);
            return user;
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPrisma = yield client_1.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!userPrisma) {
                throw HttpException_1.HttpException.UnauthorizedError("Email or password incorrect");
            }
            const user = new User_1.User(userPrisma.name, userPrisma.email, userPrisma.password, userPrisma.role, userPrisma.id);
            return user;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersPrisma = yield client_1.prisma.user.findMany();
            User_1.User.userList = usersPrisma.map((user) => {
                return new User_1.User(user.name, user.email, user.password, user.role, user.id);
            });
            return User_1.User.userList;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let userAlreadyExists = yield client_1.prisma.user.findUnique({
                where: {
                    email: user.getEmail(),
                },
            });
            if (userAlreadyExists) {
                throw HttpException_1.HttpException.ConflictError("User already exists");
            }
            let userPrisma = yield client_1.prisma.user.create({
                data: {
                    name: user.getName(),
                    email: user.getEmail(),
                    password: (0, bcrypt_1.hashSync)(user.getPassword(), 10),
                    role: user.isStudent() ? client_2.Role.STUDENT : client_2.Role.PROFESSOR,
                },
            });
            user.setId(userPrisma.id);
            return user;
        });
    }
    update(id, name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            let userPrisma = yield this.get(id);
            if (!userPrisma) {
                throw HttpException_1.HttpException.NotFoundError("User not found");
            }
            let user = yield client_1.prisma.user.update({
                where: {
                    id: userPrisma.getId(),
                },
                data: {
                    name: (typeof name == "string") ? name : userPrisma.getName(),
                    email: (typeof email == "string") ? email : userPrisma.getEmail(),
                    password: (typeof password == "string") ? (0, bcrypt_1.hashSync)(password, 10) : userPrisma.getPassword(),
                    role: ['STUDENT', 'PROFESSOR'].includes(role) ? (role == 'STUDENT' ? client_2.Role.STUDENT : client_2.Role.PROFESSOR) : userPrisma.getRole() == 'STUDENT' ? client_2.Role.STUDENT : client_2.Role.PROFESSOR,
                },
            });
            userPrisma.setName(user.name);
            userPrisma.setEmail(user.email);
            userPrisma.setPassword(user.password);
            userPrisma.setRole(user.role);
            return userPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userPrisma = yield this.get(id);
            if (!userPrisma) {
                throw HttpException_1.HttpException.NotFoundError("User not found");
            }
            let user = yield client_1.prisma.user.delete({
                where: {
                    id: userPrisma.getId(),
                }
            });
            return user.id.toString();
        });
    }
    executeAuthentication(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getByEmail(email);
            if (!user) {
                throw HttpException_1.HttpException.UnauthorizedError("Email or password incorrect");
            }
            const passwordMatch = (0, bcrypt_1.compareSync)(password, user.getPassword());
            if (!passwordMatch) {
                throw HttpException_1.HttpException.UnauthorizedError("Email or password incorrect");
            }
            const token = yield TokenUser_1.TokenUser.generateToken(user.getId());
            return { token, user };
        });
    }
}
exports.UserRepository = UserRepository;
