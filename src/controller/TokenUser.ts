import { Request, Response } from "express";
import { HttpException } from "../Exceptions/HttpException";
import { prisma } from "../database/config/client";
import { sign, verify } from "jsonwebtoken";
import dayjs from "dayjs";
import { create } from "domain";
import { z } from "zod";
export class TokenUser {

    public static async generateToken(userId: string) {
        return sign({}, process.env.JWT_KEY, {
            subject: userId,
            expiresIn: "20s"
        });
    }

    public static async validateToken(token:string) : Promise<boolean>{
        const jwtPayload = verify(token, process.env.JWT_KEY);

        const createPayload = z.object({
            userId : z.string().max(36),
        });

        const {userId} = createPayload.parse(jwtPayload);

        const userPrisma = await prisma.user.findFirst({
            where:{
                id: userId,
            }
        });

        if(!userPrisma){
            throw HttpException.UnauthorizedError("Token inválido");
        };

        return true;
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
            data:{
                userId: userId,
                expiresIn,
            }
        });

        return generateRefreshToken;
    }

    public static checkTokenExpired(expiresIn: number): boolean {
        const tokenExpired = dayjs().isAfter(dayjs.unix(expiresIn));
        if(tokenExpired){
            return true;
        }
        return false;
    }
}