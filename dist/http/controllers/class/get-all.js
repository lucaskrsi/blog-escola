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
exports.getAll = void 0;
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeClassRepository_1 = require("../../../repositories/factory/makeClassRepository");
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const classRepository = (0, makeClassRepository_1.makeClassRepository)();
            const classList = yield classRepository.getAll();
            let studentsList = [];
            let classObjectList = [];
            for (const classObject of classList) {
                let students = yield classRepository.getStudents(classObject);
                if (students) {
                    studentsList = students.map(student => {
                        return {
                            id: student.getId(),
                            name: student.user.getName(),
                            email: student.user.getEmail(),
                        };
                    });
                }
                classObjectList.push({
                    id: classObject.getId(),
                    class: classObject.getName(),
                    students: studentsList
                });
            }
            res.status(201).json({
                data: {
                    classes: classObjectList,
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.getAll = getAll;
