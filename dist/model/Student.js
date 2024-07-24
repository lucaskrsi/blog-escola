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
exports.Student = void 0;
const client_1 = require("./../database/config/client");
const bcrypt_1 = require("bcrypt");
class Student {
    create(name, email, birthDate, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield client_1.prisma.user.findFirst({ where: { email } });
            if (user) {
                throw new Error('User already exists');
            }
            user = yield client_1.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: (0, bcrypt_1.hashSync)(password, 10),
                    Student: {
                        create: [
                            {
                                birthDate: birthDate,
                            }
                        ]
                    }
                }
            });
            const student = yield client_1.prisma.student.findFirst({
                where: {
                    id: user.id,
                }
            });
            return student;
        });
    }
}
exports.Student = Student;
