import { HttpException } from "../../exceptions/HttpException";
import { prisma } from "../../database/config/client";
import { IUser } from "../../models/interfaces/User.interface";
import { IUserRepository } from "../interfaces/User.repository.interface";
import { User } from "../../models/User";
import { compareSync, hashSync } from "bcrypt";
import { Role } from "@prisma/client";
import { TokenUser } from "../../utils/TokenUser";

export class UserRepository implements IUserRepository {

    async get(id: string): Promise<IUser> {
        const userPrisma = await prisma.user.findUnique({
            where: {
                id: id,
            },
        })

        if (!userPrisma) {
            throw HttpException.NotFoundError("User not found");
        }

        const user = new User(
            userPrisma.name,
            userPrisma.email,
            userPrisma.password,
            userPrisma.role,
            userPrisma.id
        );

        return user;
    }

    async getByEmail(email: string): Promise<IUser> {
        const userPrisma = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!userPrisma) {
            throw HttpException.UnauthorizedError("Email or password incorrect");
        }

        const user = new User(
            userPrisma.name,
            userPrisma.email,
            userPrisma.password,
            userPrisma.role,
            userPrisma.id
        );

        return user;
    }

    async getAll(): Promise<IUser[]> {
        const usersPrisma = await prisma.user.findMany();
        User.userList = usersPrisma.map((user) => {
            return new User(
                user.name,
                user.email,
                user.password,
                user.role,
                user.id
            )
        });

        return User.userList;
    }

    async create(user: IUser): Promise<IUser> {
        let userAlreadyExists = await prisma.user.findUnique({
            where: {
                email: user.getEmail(),
            },
        })

        if (userAlreadyExists) {
            throw HttpException.ConflictError("User already exists");
        }

        let userPrisma = await prisma.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                password: hashSync(user.getPassword(), 10),
                role: user.isStudent() ? Role.STUDENT : Role.PROFESSOR,
            },
        })

        user.setId(userPrisma.id);
        return user;
    }

    async update(id: string, name?: string, email?: string, password?: string, role?: string): Promise<IUser> {
        let userPrisma = await this.get(id);

        if (!userPrisma) {
            throw HttpException.NotFoundError("User not found");
        }

        let user = await prisma.user.update({
            where: {
                id: userPrisma.getId(),
            },
            data: {
                name: (typeof name == "string") ? name : userPrisma.getName(),
                email: (typeof email == "string") ? email : userPrisma.getEmail(),
                password: (typeof password == "string" && password.trim() != "") ? hashSync(password, 10) : userPrisma.getPassword(),
                role: ['STUDENT', 'PROFESSOR'].includes(role) ? (role == 'STUDENT' ? Role.STUDENT : Role.PROFESSOR) : userPrisma.getRole() == 'STUDENT' ? Role.STUDENT : Role.PROFESSOR,
            },
        })

        userPrisma.setName(user.name);
        userPrisma.setEmail(user.email);
        userPrisma.setPassword(user.password);
        userPrisma.setRole(user.role);
        return userPrisma;
    }

    async delete(id: string): Promise<string> {
        let userPrisma = await this.get(id);

        if (!userPrisma) {
            throw HttpException.NotFoundError("User not found");
        }

        let user = await prisma.user.delete({
            where: {
                id: userPrisma.getId(),
            }
        })

        return user.id.toString();
    }

    async executeAuthentication(email: string, password: string) {
        const user = await this.getByEmail(email);

        if (!user) {
            throw HttpException.UnauthorizedError("Email or password incorrect");
        }

        const passwordMatch = compareSync(password, user.getPassword());

        if (!passwordMatch) {
            throw HttpException.UnauthorizedError("Email or password incorrect");
        }

        const token = await TokenUser.generateToken(user.getId());

        return { token, user };
    }
}