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
exports.getPosts = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makeClassRepository_1 = require("../../../repositories/factory/makeClassRepository");
function getPosts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createParam = zod_1.z.object({
                id: zod_1.z.string().max(36),
            });
            const { id } = createParam.parse(req.params);
            const classRepository = (0, makeClassRepository_1.makeClassRepository)();
            const classObject = yield classRepository.get(id);
            const posts = yield classRepository.getPosts(classObject);
            let postsList = posts.map(post => {
                return {
                    id: post.getId(),
                    title: post.getTitle(),
                    content: post.getContent(),
                    published: post.isPublished(),
                    author: {
                        id: post.author.getId(),
                        name: post.author.user.getName(),
                    }
                };
            });
            res.status(200).json({
                data: {
                    class: {
                        id: classObject.getId(),
                        name: classObject.getName(),
                    },
                    posts: postsList,
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.getPosts = getPosts;
