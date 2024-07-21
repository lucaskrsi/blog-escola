import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makePostRepository } from "../../../repositories/factory/makePostRepository";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            classId: z.optional(z.string().max(36)),
            title: z.optional(z.string()),
            content: z.optional(z.string()),
            published: z.optional(z.boolean().default(false))
        });

        const createParam = z.object({
            id: z.string().max(36),
        })

        const { classId, title, content, published } = createBody.parse(req.body);
        const { id } = createParam.parse(req.params);

        const postRepository = makePostRepository();
        const classRepository = makeClassRepository();

        let classObject = null;
        if(classId){
            classObject = await classRepository.get(classId);
        }

        const post = await postRepository.update(id, classObject, title, content, published);
        res.status(201).json({
            data: { postId: post.getId() },
            message: 'Updated successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}