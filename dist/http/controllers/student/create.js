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
exports.create = void 0;
const zod_1 = require("zod");
const User_1 = require("../../../models/User");
const makeStudentRepository_1 = require("../../../repositories/factory/makeStudentRepository");
const Student_1 = require("../../../models/Student");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                name: zod_1.z.string().max(80),
                email: zod_1.z.string().email(),
                password: zod_1.z.string(),
                birthDate: zod_1.z.string(),
                ra: zod_1.z.string()
            });
            const { name, email, password, birthDate, ra } = createBody.parse(req.body);
            const studentRepository = (0, makeStudentRepository_1.makeStudentRepository)();
            const student = yield studentRepository.create(new Student_1.Student(new User_1.User(name, email, password, User_1.User.studentRole), birthDate, ra));
            res.status(201).json({
                data: { userId: student.getId() },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.create = create;
