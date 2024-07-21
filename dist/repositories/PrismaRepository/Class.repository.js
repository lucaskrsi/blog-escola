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
exports.ClassRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const User_1 = require("../../models/User");
const Class_1 = require("../../models/Class");
const Student_1 = require("../../models/Student");
const Post_1 = require("../../models/Post");
const Professor_1 = require("../../models/Professor");
class ClassRepository {
    getPosts(classObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const postPrisma = yield client_1.prisma.post.findMany({
                where: {
                    classId: classObject.getId(),
                },
                include: {
                    author: {
                        include: {
                            user: true,
                        },
                    },
                },
            });
            let posts = postPrisma.map(post => {
                return new Post_1.Post(classObject, new Professor_1.Professor(new User_1.User(post.author.user.name, post.author.user.email, post.author.user.password, post.author.user.role, post.author.user.id), post.author.professorNumber, post.author.id), post.title, post.content, post.published, post.id);
            });
            return posts;
        });
    }
    getStudents(classObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentPrisma = yield client_1.prisma.student.findMany({
                include: {
                    class: {
                        where: {
                            id: classObject.getId(),
                        },
                    },
                    user: true,
                }
            });
            if (!studentPrisma) {
                throw HttpException_1.HttpException.NotFoundError("No students enrolled in this class");
            }
            let studentList = studentPrisma.map((student) => {
                return new Student_1.Student(new User_1.User(student.user.name, student.user.email, student.user.password, student.user.role, student.user.id), student.birthDate.toString(), student.ra, student.id);
            });
            return studentList;
        });
    }
    addStudent(classObject, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const classPrisma = yield client_1.prisma.class.update({
                where: {
                    id: student.getId(),
                },
                data: {
                    student: {
                        connect: {
                            id: student.getId(),
                        }
                    }
                },
                include: {
                    student: {
                        include: {
                            user: true,
                        }
                    },
                }
            });
            let studentList = classPrisma.student.map((student) => {
                return new Student_1.Student(new User_1.User(student.user.name, student.user.email, student.user.password, student.user.role, student.user.id), student.birthDate.toString(), student.ra, student.id);
            });
            classObject.addStudents(studentList);
            return classObject;
        });
    }
    create(classObject) {
        return __awaiter(this, void 0, void 0, function* () {
            let classPrisma = yield client_1.prisma.class.create({
                data: {
                    name: classObject.getName(),
                },
            });
            classObject.setId(classPrisma.id);
            return classObject;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const classPrisma = yield client_1.prisma.class.findUnique({
                where: {
                    id: id,
                },
                include: {
                    student: true,
                }
            });
            if (!classPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Class not found");
            }
            const classObject = new Class_1.Class(classPrisma.name, classPrisma.id);
            return classObject;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const classPrisma = yield client_1.prisma.class.findMany();
            Class_1.Class.classList = classPrisma.map((classObject) => {
                return new Class_1.Class(classObject.name, classObject.id);
            });
            return Class_1.Class.classList;
        });
    }
    update(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            let classPrisma = yield this.get(id);
            if (!classPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Class not found");
            }
            let classObject = yield client_1.prisma.class.update({
                where: {
                    id: classPrisma.getId(),
                },
                data: {
                    name: (typeof name == "string") ? name : classPrisma.getName(),
                },
                include: {
                    student: true,
                }
            });
            classPrisma.setName(classObject.name);
            return classPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let classPrisma = yield this.get(id);
            if (!classPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Class not found");
            }
            let user = yield client_1.prisma.class.delete({
                where: {
                    id: classPrisma.getId(),
                }
            });
            return user.id.toString();
        });
    }
}
exports.ClassRepository = ClassRepository;
