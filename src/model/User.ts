import { Prisma, Role } from "@prisma/client";
import { prisma } from "../database/config/client"
import { compare, compareSync, hashSync } from "bcrypt";
import { validate as validateUuid } from "uuid";
import { PrismaExceptionHandler } from "../Exceptions/PrismaExceptionHandler";
import { HttpException } from "../Exceptions/HttpException";
import { ErrorHandler } from "../Exceptions/ErrorHandler";
import { sign } from "jsonwebtoken";
import { user } from "../http/routes/UserRoute";
import dayjs from "dayjs";
import { TokenUser } from "../controller/TokenUser";

export class User {

    private _id: string | undefined;
    private _name: string
    private _email: string
    private _password: string
    private _role: string
    public static userList: User[];

    public constructor(id: string | undefined = undefined, name: string, email: string, password: string, role: string) {
        if (typeof id !== "undefined") {
            validateUuid(id);
        }
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
    }

    public static async executeAuthentication(email: string, password: string) {
        const user = await User.getByEmail(email);

        const passwordMatch = compareSync(password, user.getPassword());

        if (!passwordMatch) {
            throw HttpException.UnauthorizedError("Email or password incorrect");
        }

        const token = TokenUser.generateToken(user.getId());

        return { token, user};
    }

    public static async get(id: string): Promise<User> {
        const userPrisma = await prisma.user.findUnique({
            where: {
                id: id,
            },
        })

        if (!userPrisma) {
            throw HttpException.NotFoundError("User not found");
        }

        const user = new User(
            userPrisma.id,
            userPrisma.name,
            userPrisma.email,
            userPrisma.password,
            userPrisma.role
        );

        return user;
    }

    public static async getByEmail(email: string): Promise<User> {
        const userPrisma = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!userPrisma) {
            throw HttpException.NotFoundError("User not found");
        }

        const user = new User(
            userPrisma.id,
            userPrisma.name,
            userPrisma.email,
            userPrisma.password,
            userPrisma.role
        );

        return user;
    }

    public static async getAll(): Promise<Array<User>> {
        const usersPrisma = await prisma.user.findMany();
        User.userList = usersPrisma.map((user) => {
            return new User(
                user.id,
                user.name,
                user.email,
                user.password,
                user.role)
        });

        return User.userList;
    }

    public static async create(name: string, email: string, password: string, role: string): Promise<User> {
        const user = new User(undefined, name, email, password, role);
        return user.create();
    }

    public static async update(id: string, name?: string | undefined, email?: string | undefined, password?: string | undefined, role?: string | undefined): Promise<User> {
        let userPrisma = await User.get(id);

        if (!userPrisma) {
            throw HttpException.NotFoundError("User not found");
        }

        return userPrisma.update(name, email, password, role);
    }

    public static async delete(id: string): Promise<string> {
        let userPrisma = await User.get(id);

        if (!userPrisma) {
            throw HttpException.NotFoundError("User not found");
        }

        return userPrisma.delete();
    }

    public async create() {
        let userPrisma = await prisma.user.findUnique({
            where: {
                email: this.getEmail()
            },
        });

        if (userPrisma) {
            throw HttpException.ConflictError("User already exists");
        }

        let user = await prisma.user.create({
            data: {
                name: this.getName(),
                email: this.getEmail(),
                password: hashSync(this.getPassword(), 10),
                role: this.getRole() == 'STUDENT' ? Role.STUDENT : Role.PROFESSOR,
            },
        })

        this.setId(user.id);
        return this;
    }

    public async update(name?: string | undefined, email?: string | undefined, password?: string | undefined, role?: string | undefined): Promise<User> {
        let user = await prisma.user.update({
            where: {
                id: this.getId(),
            },
            data: {
                name: (typeof name == "string") ? name : this.getName(),
                email: (typeof email == "string") ? email : this.getEmail(),
                password: (typeof password == "string") ? hashSync(password, 10) : this.getPassword(),
                role: ['STUDENT', 'PROFESSOR'].includes(role) ? (role == 'STUDENT' ? Role.STUDENT : Role.PROFESSOR) : this.getRole() == 'STUDENT' ? Role.STUDENT : Role.PROFESSOR,
            },
        })

        this.setName(user.name);
        this.setEmail(user.email);
        this.setPassword(user.password);
        this.setRole(user.role);
        return this;
    }

    public async delete(): Promise<string> {
        let user = await prisma.user.delete({
            where: {
                id: this.getId(),
            }
        })

        return user.id;
    }


    private setId(id: string) {
        validateUuid(id);
        this._id = id;
    }

    public getId(): string | undefined {
        return this._id;
    }

    private setName(name: string) {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    private setEmail(email: string) {
        this._email = email;
    }

    public getEmail(): string {
        return this._email;
    }

    private setPassword(password: string) {
        this._password = password;
    }

    private getPassword(): string {
        return this._password;
    }

    private setRole(role: string) {
        this._role = role;
    }

    public getRole(): string {
        return this._role;
    }

    public isProfessor(): boolean {
        return (this.getRole() == 'PROFESSOR');
    }

    public isStudent(): boolean {
        return (this.getRole() == 'STUDENT');
    }
}