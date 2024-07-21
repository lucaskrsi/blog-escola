import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makePostRepository } from "../../../repositories/factory/makePostRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const postRepository = makePostRepository();
        const post = await postRepository.get(id);
        res.status(200).json({
            data: {
                id: post.getId(),
                title: post.getTitle(),
                content: post.getContent(),
                published: post.isPublished(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}