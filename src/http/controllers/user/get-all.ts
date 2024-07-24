import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { makeUserRepository } from "../../../repositories/factory/makeUserRepository";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const userRepository = makeUserRepository();
        const userList = await userRepository.getAll();
        let list = userList.map(user => {
            return {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                role: user.getRole(),
            };
        });
        res.status(200).json({
            data: {
                users: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}