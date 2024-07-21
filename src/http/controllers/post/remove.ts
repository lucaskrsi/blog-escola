import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makePostRepository } from "../../../repositories/factory/makePostRepository";

export async function remove(req: Request, res: Response, next: NextFunction) {
    try {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        const postRepository = makePostRepository();
        const postId = await postRepository.delete(id);
        res.status(200).json({
            data: { postId: postId },
            message: 'Deleted successfully',
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}