import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeProfessorRepository } from "../../../repositories/factory/makeProfessorRepository";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";
import { makePostRepository } from "../../../repositories/factory/makePostRepository";
import { Post } from "../../../models/Post";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            classId: z.string().max(36),
            authorId: z.string().max(36),
            title: z.string(),
            content: z.string(),
            published: z.boolean().default(false)
        });

        const { classId, authorId, title, content, published } = createBody.parse(req.body);

        const professorRepository = makeProfessorRepository();
        const classRepository = makeClassRepository();
        const postRepository = makePostRepository();

        const classObject = await classRepository.get(classId);
        const professor = await professorRepository.get(authorId);
        const post = await postRepository.create(new Post(classObject, professor, title, content, published));

        res.status(201).json({
            data: { 
                postId: post.getId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}