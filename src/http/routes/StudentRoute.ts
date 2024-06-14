import { NextFunction, Request, Response } from "express";
import { Student } from "../../model/Student";
import { z } from "zod";
import { ErrorHandler } from "../../Exceptions/ErrorHandler";

class StudentRoute {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createBody = z.object({
                name: z.string().max(80),
                email: z.string().email(),
                ra: z.string().length(8),
                birthDate: z.date(),
                password: z.string(),
            });

            const { name, email, ra, birthDate, password } = createBody.parse(req.body);

            const student = await Student.create(name, email, ra, birthDate, password);
            res.status(201).json({
                data: { userId: student.getUserId() },
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
                data: {
                    users: list,
                },
            });
        } catch (e) {
            next(ErrorHandler.handler(e));
        }

    }
}
export const student = new StudentRoute();