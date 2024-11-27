import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makePostRepository } from "../../../repositories/factory/makePostRepository";

export async function getAllAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const postRepository = makePostRepository();
        const postList = await postRepository.getAll(true);
        let list = postList.map(post => {
            return {
                id: post.getId(),
                title: post.getTitle(),
                content: post.getContent(),
                author: {
                    id: post.getAuthor().getId(),
                    name: post.getAuthor().user.getName(),
                    email: post.getAuthor().user.getEmail()
                },
                published: post.isPublished(),
                class: {
                    id: post.getClass().getId(),
                    name: post.getClass().getName()
                }
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