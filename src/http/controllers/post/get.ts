import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makePostRepository } from "../../../repositories/factory/makePostRepository";
import { makeUserRepository } from "../../../repositories/factory/makeUserRepository";

export async function get(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const postRepository = makePostRepository();
        const post = await postRepository.get(id);
        const userRepository = makeUserRepository();
        const author = await userRepository.get(post.getAuthor().getUserId());
        res.status(200).json({
            data: {
                id: post.getId(),
                title: post.getTitle(),
                content: post.getContent(),
                author: {
                    id: post.getAuthor().getId(),
                    name: post.getAuthor().user.getName(),
                    email: post.getAuthor().user.getEmail()
                },
                class: {
                    id: post.getClass().getId(),
                    name: post.getClass().getName()
                },
                published: post.isPublished(),
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}