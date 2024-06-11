import { Request, Response } from "express";
import { User } from "../../model/User";
import { z } from "zod";

class UserRoute {

    async create(req: Request, res: Response) {
        const createBody = z.object({
            name: z.string().max(80),
            email: z.string().email(),
            password: z.string(),
            role: z.string()
        });

        const { name, email, password, role } = createBody.parse(req.body);

        try {
            const user = await User.create(name, email, password, role);
            res.status(201).json({
                data: { userId: user.getId() },
            });
        } catch (e) {
            console.log(e.message);
            res.status(500).json({
                message: e.message
            });
        }
    }

    async update(req: Request, res: Response) {
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

        try {
            const user = await User.update(id, name, email, password, role);
            res.status(201).json({
                data: { userId: user.getId() },
                message: 'Updated successfully',
            });
        } catch (e) {
            console.log(e.message);
            res.status(500).json({
                message: e.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        res.json({
            message: 'Welcome',
        });
    }

    async get(req: Request, res: Response) {
        const createParam = z.object({
            id: z.string().max(36),
        });

        const { id } = createParam.parse(req.params);
        try {
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
            console.log(e.message);
            res.status(500).json({
                message: e.message
            });
        }
    }

    async getAll(req: Request, res: Response) {
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
            console.log(e.message);
            res.status(500).json({
                message: e.message
            });
        }
    }

}

export const user = new UserRoute();