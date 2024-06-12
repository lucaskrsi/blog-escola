import { NextFunction, Request, Response } from "express";
import { User } from "../../model/User";
import { z } from "zod";
import { ErrorHandler } from "../../Exceptions/ErrorHandler";

class UserRoute {

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const createBody = z.object({
                email: z.string().email(),
                password: z.string()
            });

            const { email, password } = createBody.parse(req.body);
            const { token, user } = await User.executeAuthentication(email, password);
            const refreshToken = await User.generateRefreshToken(user.getId());
            res.status(201).json({
                data: {
                    token,
                    refreshToken,
                }
            });
        } catch (e) {
            next(ErrorHandler.handler(e));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createBody = z.object({
                name: z.string().max(80),
                email: z.string().email(),
                password: z.string(),
                role: z.string()
            });

            const { name, email, password, role } = createBody.parse(req.body);

            const user = await User.create(name, email, password, role);
            res.status(201).json({
                data: { userId: user.getId() },
            });
        } catch (e) {
            next(ErrorHandler.handler(e));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const createBody = z.object({
                name: z.optional(z.string().max(80)),
                email: z.optional(z.string().email()),
                password: z.optional(z.string()),
                role: z.optional(z.string()),
            });

            const createParam = z.object({
                id: z.string().max(36),
            })

            const { name, email, password, role } = createBody.parse(req.body);
            const { id } = createParam.parse(req.params);

            const user = await User.update(id, name, email, password, role);
            res.status(201).json({
                data: { userId: user.getId() },
                message: 'Updated successfully',
            });
        } catch (e) {
            next(ErrorHandler.handler(e));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const createParam = z.object({
                id: z.string().max(36),
            });

            const { id } = createParam.parse(req.params);
            const userId = await User.delete(id);
            res.status(200).json({
                data: { userId: userId },
                message: 'Deleted successfully',
            });
        } catch (e) {
            next(ErrorHandler.handler(e));
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const createParam = z.object({
                id: z.string().max(36),
            });

            const { id } = createParam.parse(req.params);
            const user = await User.get(id);
            res.status(200).json({
                data: {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    role: user.getRole(),
                },
            });
        } catch (e) {
            next(ErrorHandler.handler(e));
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userList = await User.getAll();
            let list = userList.map(user => {
                return {
                    id: user.getId(),
                    name: user.getName(),
                    email: user.getEmail(),
                    role: user.getRole(),
                };
            });
            res.status(201).json({
                data: list,
            });
        } catch (e) {
            next(ErrorHandler.handler(e));
        }
    }

}

export const user = new UserRoute();