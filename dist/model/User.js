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
exports.User = void 0;
const client_1 = require("@prisma/client");
const client_2 = require("../database/config/client");
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const HttpException_1 = require("../exceptions/HttpException");
const TokenUser_1 = require("../controller/TokenUser");
class User {
    constructor(id = undefined, name, email, password, role) {
        if (typeof id !== "undefined") {
            (0, uuid_1.validate)(id);
        }
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
    }
    static executeAuthentication(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User.getByEmail(email);
            const passwordMatch = (0, bcrypt_1.compareSync)(password, user.getPassword());
            if (!passwordMatch) {
                throw HttpException_1.HttpException.UnauthorizedError("Email or password incorrect");
            }
            const token = yield TokenUser_1.TokenUser.generateToken(user.getId());
            return { token, user };
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPrisma = yield client_2.prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!userPrisma) {
                throw HttpException_1.HttpException.NotFoundError("User not found");
            }
            const user = new User(userPrisma.id, userPrisma.name, userPrisma.email, userPrisma.password, userPrisma.role);
            return user;
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPrisma = yield client_2.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!userPrisma) {
                throw HttpException_1.HttpException.NotFoundError("User not found");
            }
            const user = new User(userPrisma.id, userPrisma.name, userPrisma.email, userPrisma.password, userPrisma.role);
            return user;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersPrisma = yield client_2.prisma.user.findMany();
            User.userList = usersPrisma.map((user) => {
                return new User(user.id, user.name, user.email, user.password, user.role);
            });
            return User.userList;
        });
    }
    static create(name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new User(undefined, name, email, password, role);
            return user.create();
        });
    }
    static update(id, name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            let userPrisma = yield User.get(id);
            if (!userPrisma) {
                throw HttpException_1.HttpException.NotFoundError("User not found");
            }
            return userPrisma.update(name, email, password, role);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userPrisma = yield User.get(id);
            if (!userPrisma) {
                throw HttpException_1.HttpException.NotFoundError("User not found");
            }
            return yield userPrisma.delete();
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            let userPrisma = yield client_2.prisma.user.findUnique({
                where: {
                    email: this.getEmail()
                },
            });
            if (userPrisma) {
                throw HttpException_1.HttpException.ConflictError("User already exists");
            }
            let user = yield client_2.prisma.user.create({
                data: {
                    name: this.getName(),
                    email: this.getEmail(),
                    password: (0, bcrypt_1.hashSync)(this.getPassword(), 10),
                    role: this.getRole() == 'STUDENT' ? client_1.Role.STUDENT : client_1.Role.PROFESSOR,
                },
            });
            this.setId(user.id);
            return this;
        });
    }
    update(name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield client_2.prisma.user.update({
                where: {
                    id: this.getId(),
                },
                data: {
                    name: (typeof name == "string") ? name : this.getName(),
                    email: (typeof email == "string") ? email : this.getEmail(),
                    password: (typeof password == "string") ? (0, bcrypt_1.hashSync)(password, 10) : this.getPassword(),
                    role: ['STUDENT', 'PROFESSOR'].includes(role) ? (role == 'STUDENT' ? client_1.Role.STUDENT : client_1.Role.PROFESSOR) : this.getRole() == 'STUDENT' ? client_1.Role.STUDENT : client_1.Role.PROFESSOR,
                },
            });
            this.setName(user.name);
            this.setEmail(user.email);
            this.setPassword(user.password);
            this.setRole(user.role);
            return this;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield client_2.prisma.user.delete({
                where: {
                    id: this.getId(),
                }
            });
            return user.id.toString();
        });
    }
    setId(id) {
        (0, uuid_1.validate)(id);
        this._id = id;
    }
    getId() {
        return this._id;
    }
    setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    setEmail(email) {
        this._email = email;
    }
    getEmail() {
        return this._email;
    }
    setPassword(password) {
        this._password = password;
    }
    getPassword() {
        return this._password;
    }
    setRole(role) {
        this._role = role;
    }
    getRole() {
        return this._role;
    }
    isProfessor() {
        return (this.getRole() == 'PROFESSOR');
    }
    isStudent() {
        return (this.getRole() == 'STUDENT');
    }
}
exports.User = User;
