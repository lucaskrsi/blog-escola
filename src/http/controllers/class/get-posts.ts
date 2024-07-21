import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";

export async function getPosts(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const classRepository = makeClassRepository();
        const classObject = await classRepository.get(id);
        const posts = await classRepository.getPosts(classObject);
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
                }
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
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}