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
exports.getAllSearch = void 0;
const zod_1 = require("zod");
const ErrorHandler_1 = require("../../../exceptions/ErrorHandler");
const makePostRepository_1 = require("../../../repositories/factory/makePostRepository");
function getAllSearch(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createParam = zod_1.z.object({
                keyword: zod_1.z.optional(zod_1.z.string().transform(value => value.replace(/\s+/g, ''))),
            });
            const { keyword } = createParam.parse(req.query);
            console.log(keyword);
            const postRepository = (0, makePostRepository_1.makePostRepository)();
            const postList = yield postRepository.getAllSearch(keyword);
            let list = postList.map(post => {
                return {
                    id: post.getId(),
                    title: post.getTitle(),
                    content: post.getContent(),
                    author: post.getAuthor().getId(),
                };
            });
            res.status(201).json({
                data: {
                    posts: list,
                },
            });
        }
        catch (e) {
            next(ErrorHandler_1.ErrorHandler.handler(e));
        }
    });
}
exports.getAllSearch = getAllSearch;
