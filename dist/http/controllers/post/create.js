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
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeProfessorRepository_1 = require("../../../repositories/factory/makeProfessorRepository");
const makeClassRepository_1 = require("../../../repositories/factory/makeClassRepository");
const makePostRepository_1 = require("../../../repositories/factory/makePostRepository");
const Post_1 = require("../../../models/Post");
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createBody = zod_1.z.object({
                classId: zod_1.z.string().max(36),
                authorId: zod_1.z.string().max(36),
                title: zod_1.z.string(),
                content: zod_1.z.string(),
                published: zod_1.z.boolean().default(false)
            });
            const { classId, authorId, title, content, published } = createBody.parse(req.body);
            const professorRepository = (0, makeProfessorRepository_1.makeProfessorRepository)();
            const classRepository = (0, makeClassRepository_1.makeClassRepository)();
            const postRepository = (0, makePostRepository_1.makePostRepository)();
            const classObject = yield classRepository.get(classId);
            const professor = yield professorRepository.get(authorId);
            const post = yield postRepository.create(new Post_1.Post(classObject, professor, title, content, published));
            res.status(201).json({
                data: {
                    postId: post.getId(),
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.create = create;
