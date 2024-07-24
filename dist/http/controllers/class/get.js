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
exports.get = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeClassRepository_1 = require("../../../repositories/factory/makeClassRepository");
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { id } = createParam.parse(req.params);
            const classRepository = (0, makeClassRepository_1.makeClassRepository)();
            const classObject = yield classRepository.get(id);
            let students = yield classRepository.getStudents(classObject);
            let studentsList = students.map(student => {
                return {
                    id: student.getId(),
                    name: student.user.getName(),
                    email: student.user.getEmail(),
                };
            });
            res.status(200).json({
                data: {
                    class: {
                        id: classObject.getId(),
                        name: classObject.getName(),
                        students: studentsList
                    }
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.get = get;
