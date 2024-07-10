import { Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";
import { prisma } from "../database/config/client";
import { sign, verify } from "jsonwebtoken";
import dayjs from "dayjs";
import { create } from "domain";
import { z } from "zod";
import { User } from "../models/User";
import { UserRepository } from "../repositories/PrismaRepository/User.repository";
import { makeUserRepository } from "../repositories/factory/makeUserRepository";
export class TokenUser {

    public static async generateToken(userId: string) : Promise<string> {
        return sign({}, process.env.JWT_KEY, {
            subject: userId,
            expiresIn: "120s"
        });
    }

    public static async validateToken(token: string) : Promise<string> {
        const jwtPayload = verify(token, process.env.JWT_KEY);

        const createPayload = z.object({
            sub: z.string().max(36),
        });

        const { sub } = createPayload.parse(jwtPayload);

        const userRepository = makeUserRepository();
        const userPrisma = await userRepository.get(sub);

        if (!userPrisma) {
            throw HttpException.UnauthorizedError("Token inválido");
        };

        const role = userPrisma.getRole();

        return role;
    }

    public static async refreshToken(refreshToken) {
        const refreshTokenPrisma = await prisma.refreshToken.findFirst({
            where: {
                id: refreshToken,
            }
        });
        if (!refreshTokenPrisma) {
            throw HttpException.UnauthorizedError("Refresh token invalid.");
        }

        const userId = refreshTokenPrisma.userId;

        const token = await TokenUser.generateToken(userId);

        const refreshTokenExpired = TokenUser.checkTokenExpired(refreshTokenPrisma.expiresIn);

        if (refreshTokenExpired) {
            await prisma.refreshToken.deleteMany({
                where: {
                    userId,
                },
            });

            const newRefreshToken = await TokenUser.generateRefreshToken(userId);
            return { token, newRefreshToken };
        }

        return { token }
    }

    public static async generateRefreshToken(userId: string) {
        const expiresIn = dayjs().add(1, "hour").unix();

        await prisma.refreshToken.deleteMany({
            where: {
                userId: userId,
            },
        });

        const generateRefreshToken = await prisma.refreshToken.create({
            data: {
                userId: userId,
                expiresIn,
            }
        });

        return generateRefreshToken;
    }

    public static checkTokenExpired(expiresIn: number): boolean {
        const tokenExpired = dayjs().isAfter(dayjs.unix(expiresIn));
        if (tokenExpired) {
            return true;
        }
        return false;
    }
}