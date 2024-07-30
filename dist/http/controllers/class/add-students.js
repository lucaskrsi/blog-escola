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
exports.addStudents = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeClassRepository_1 = require("../../../repositories/factory/makeClassRepository");
const makeStudentRepository_1 = require("../../../repositories/factory/makeStudentRepository");
function addStudents(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createStudentSchema = zod_1.z.object({
                studentId: zod_1.z.string().max(36),
            });
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const createBody = zod_1.z.array(createStudentSchema);
            const studentListToAdd = createBody.parse(req.body);
            const { id } = createParam.parse(req.params);
            const studentRepository = (0, makeStudentRepository_1.makeStudentRepository)();
            const classRepository = (0, makeClassRepository_1.makeClassRepository)();
            let classObject = yield classRepository.get(id);
            for (let student of studentListToAdd) {
                let studentObject = yield studentRepository.get(student.studentId);
                classObject = yield classRepository.addStudent(classObject, studentObject);
            }
            let studentList = classObject.getStudents().map(student => {
                return {
                    id: student.getId(),
                    name: student.user.getName(),
                    email: student.user.getEmail(),
                };
            });
            let classObjectFiltered = {
                id: classObject.getId(),
                name: classObject.getName(),
                students: studentList
            };
            res.status(200).json({
                data: {
                    class: {
                        classObjectFiltered,
                    },
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.addStudents = addStudents;
