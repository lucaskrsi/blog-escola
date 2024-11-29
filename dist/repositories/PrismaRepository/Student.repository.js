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
exports.StudentRepository = void 0;
const bcrypt_1 = require("bcrypt");
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const client_2 = require("@prisma/client");
const Student_1 = require("../../models/Student");
const User_1 = require("../../models/User");
class StudentRepository {
    create(student) {
        return __awaiter(this, void 0, void 0, function* () {
            let userAlreadyExists = yield client_1.prisma.user.findUnique({
                where: {
                    email: student.user.getEmail(),
                },
            });
            if (userAlreadyExists) {
                throw HttpException_1.HttpException.ConflictError("User already exists");
            }
            let studentPrisma = yield client_1.prisma.student.create({
                data: {
                    birthDate: student.getBirthDate(),
                    ra: student.getRa(),
                    user: {
                        create: {
                            name: student.user.getName(),
                            email: student.user.getEmail(),
                            password: (0, bcrypt_1.hashSync)(student.user.getPassword(), 10),
                            role: student.user.isStudent() ? client_2.Role.STUDENT : client_2.Role.PROFESSOR,
                        }
                    }
                },
            });
            student.setUserId(studentPrisma.userId);
            student.setId(studentPrisma.id);
            return student;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentPrisma = yield client_1.prisma.student.findUnique({
                where: {
                    id: id,
                },
                include: {
                    user: true,
                }
            });
            if (!studentPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Student not found");
            }
            const student = new Student_1.Student(new User_1.User(studentPrisma.user.name, studentPrisma.user.email, studentPrisma.user.password, studentPrisma.user.role, studentPrisma.user.id), studentPrisma.birthDate.toString(), studentPrisma.ra, studentPrisma.id);
            return student;
        });
    }
    getByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentPrisma = yield client_1.prisma.student.findUnique({
                where: {
                    userId: id,
                },
                include: {
                    user: true,
                }
            });
            if (!studentPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Student not found");
            }
            const student = new Student_1.Student(new User_1.User(studentPrisma.user.name, studentPrisma.user.email, studentPrisma.user.password, studentPrisma.user.role, studentPrisma.user.id), studentPrisma.birthDate.toString(), studentPrisma.ra, studentPrisma.id);
            return student;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const studentPrisma = yield client_1.prisma.student.findMany({
                include: {
                    user: true,
                }
            });
            Student_1.Student.studentList = studentPrisma.map((student) => {
                return new Student_1.Student(new User_1.User(student.user.name, student.user.email, student.user.password, student.user.role, student.user.id), student.birthDate.toString(), student.ra, student.id);
            });
            return Student_1.Student.studentList;
        });
    }
    update(id, birthDate, ra, name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let studentPrisma = yield this.get(id);
            if (!studentPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Student not found");
            }
            let student = yield client_1.prisma.student.update({
                where: {
                    id: studentPrisma.getId(),
                },
                data: {
                    ra: (typeof ra == "string") ? ra : studentPrisma.getRa(),
                    birthDate: (typeof birthDate == "string") ? birthDate : studentPrisma.getBirthDate(),
                    user: {
                        update: {
                            where: {
                                id: studentPrisma.getUserId(),
                            },
                            data: {
                                name: (typeof name == "string") ? name : studentPrisma.user.getName(),
                                email: (typeof email == "string") ? email : studentPrisma.user.getEmail(),
                                password: (typeof password == "string" && password.trim() != "") ? (0, bcrypt_1.hashSync)(password, 10) : studentPrisma.user.getPassword(),
                            }
                        }
                    }
                },
                include: {
                    user: true,
                }
            });
            studentPrisma.setRa(student.ra);
            studentPrisma.setBirthDate(student.ra);
            studentPrisma.user.setName(student.user.name);
            studentPrisma.user.setEmail(student.user.email);
            studentPrisma.user.setPassword(student.user.password);
            return studentPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let studentPrisma = yield this.get(id);
            if (!studentPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Student not found");
            }
            let user = yield client_1.prisma.student.delete({
                where: {
                    id: studentPrisma.getId(),
                }
            });
            return user.id.toString();
        });
    }
}
exports.StudentRepository = StudentRepository;
