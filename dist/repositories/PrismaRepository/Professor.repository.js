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
exports.ProfessorRepository = void 0;
const bcrypt_1 = require("bcrypt");
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const client_2 = require("@prisma/client");
const User_1 = require("../../models/User");
const Professor_1 = require("../../models/Professor");
class ProfessorRepository {
    create(professor) {
        return __awaiter(this, void 0, void 0, function* () {
            let userAlreadyExists = yield client_1.prisma.user.findUnique({
                where: {
                    email: professor.user.getEmail(),
                },
            });
            if (userAlreadyExists) {
                throw HttpException_1.HttpException.ConflictError("User already exists");
            }
            let professorPrisma = yield client_1.prisma.professor.create({
                data: {
                    professorNumber: professor.getProfessorNumber(),
                    user: {
                        create: {
                            name: professor.user.getName(),
                            email: professor.user.getEmail(),
                            password: (0, bcrypt_1.hashSync)(professor.user.getPassword(), 10),
                            role: professor.user.isStudent() ? client_2.Role.STUDENT : client_2.Role.PROFESSOR,
                        }
                    }
                },
            });
            professor.setUserId(professorPrisma.userId);
            professor.setId(professorPrisma.id);
            return professor;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const professorPrisma = yield client_1.prisma.professor.findUnique({
                where: {
                    id: id,
                },
                include: {
                    user: true,
                }
            });
            if (!professorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Professor not found");
            }
            const professor = new Professor_1.Professor(new User_1.User(professorPrisma.user.name, professorPrisma.user.email, professorPrisma.user.password, professorPrisma.user.role, professorPrisma.user.id), professorPrisma.professorNumber, professorPrisma.id);
            return professor;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const professorPrisma = yield client_1.prisma.professor.findMany({
                include: {
                    user: true,
                }
            });
            Professor_1.Professor.professorList = professorPrisma.map((professor) => {
                return new Professor_1.Professor(new User_1.User(professor.user.name, professor.user.email, professor.user.password, professor.user.role, professor.user.id), professor.professorNumber, professor.id);
            });
            return Professor_1.Professor.professorList;
        });
    }
    update(id, professorNumber, name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let professorPrisma = yield this.get(id);
            if (!professorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Professor not found");
            }
            let professor = yield client_1.prisma.professor.update({
                where: {
                    id: professorPrisma.getId(),
                },
                data: {
                    professorNumber: (typeof professorNumber == "number") ? professorNumber : professorPrisma.getProfessorNumber(),
                    user: {
                        update: {
                            where: {
                                id: professorPrisma.getUserId(),
                            },
                            data: {
                                name: (typeof name == "string") ? name : professorPrisma.user.getName(),
                                email: (typeof email == "string") ? email : professorPrisma.user.getEmail(),
                                password: (typeof password == "string") ? (0, bcrypt_1.hashSync)(password, 10) : professorPrisma.user.getPassword(),
                            }
                        }
                    }
                },
                include: {
                    user: true,
                }
            });
            professorPrisma.setProfessorNumber(professor.professorNumber);
            professorPrisma.user.setName(professor.user.name);
            professorPrisma.user.setEmail(professor.user.email);
            professorPrisma.user.setPassword(professor.user.password);
            professorPrisma.user.setRole(professor.user.role);
            return professorPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let professorPrisma = yield this.get(id);
            if (!professorPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Professor not found");
            }
            let user = yield client_1.prisma.professor.delete({
                where: {
                    id: professorPrisma.getId(),
                }
            });
            return user.id.toString();
        });
    }
}
exports.ProfessorRepository = ProfessorRepository;
