import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makePostRepository } from "../../../repositories/factory/makePostRepository";

export async function getAllSearch(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            keyword: z.optional(z.string().transform(value => value.replace(/\s+/g, ''))),
        });
        const { keyword } = createParam.parse(req.query);
        const postRepository = makePostRepository();
        const postList = await postRepository.getAllSearch(keyword);
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
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}