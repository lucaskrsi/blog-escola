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
const makePostRepository_1 = require("../../../repositories/factory/makePostRepository");
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postRepository = (0, makePostRepository_1.makePostRepository)();
            const postList = yield postRepository.getAll();
            let list = postList.map(post => {
                return {
                    id: post.getId(),
                    title: post.getTitle(),
                    content: post.getContent(),
                    author: post.getAuthor().getId(),
                };
            });
            res.status(200).json({
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
exports.getAll = getAll;
