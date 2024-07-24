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
exports.update = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeProfessorRepository_1 = require("../../../repositories/factory/makeProfessorRepository");
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                professorNumber: zod_1.z.optional(zod_1.z.number()),
                name: zod_1.z.optional(zod_1.z.string().max(80)),
                email: zod_1.z.optional(zod_1.z.string().email()),
                password: zod_1.z.optional(zod_1.z.string()),
            });
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { professorNumber, name, email, password } = createBody.parse(req.body);
            const { id } = createParam.parse(req.params);
            const professorRepository = (0, makeProfessorRepository_1.makeProfessorRepository)();
            const professor = yield professorRepository.update(id, professorNumber, name, email, password);
            res.status(201).json({
                data: { professorId: professor.getId() },
                message: 'Updated successfully',
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.update = update;
