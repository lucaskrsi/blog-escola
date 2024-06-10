import { Role } from "@prisma/client";
import { prisma } from "../database/config/client"
import { Uuid } from "./Uuid"
import { hashSync } from "bcrypt";

export class User {

    private _id: Uuid | undefined;
    private _name: string
    private _email: string
    private _password: string
    private _role: string
    public static userList: User[];

    public constructor(id: Uuid | undefined, name: string, email: string, password: string, role: string) {
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
    }

    public static async get(id: string): Promise<User> {
        const userPrisma = await prisma.user.findUnique({
            where: {
                id: id,
            },
        })

        if (!userPrisma) {
            throw new Error("User not found");
        }

        const user = new User(
            new Uuid(userPrisma.id),
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
                new Uuid(user.id),
                user.name,
                user.email,
                user.password,
                user.role)
        });

        return User.userList;
    }

    public static async create(name: string, email: string, password: string, role: string) : Promise<User>{
        const user = new User(undefined, name, email, password, role);
        user.create();
        return user;
    }

    public async create() {
        if (typeof this.getId() !== "undefined") {
            let userPrisma = await prisma.user.findUnique({
                where: {
                    id: this.getId().toString(),
                },
            });

            if (userPrisma) {
                throw new Error("User already exists");
            }
        }

        let userPrisma = await prisma.user.create({
            data: {
                name: this.getName(),
                email: this.getEmail(),
                password: hashSync(this.getPassword(), 10),
                role: this.getRole() == 'STUDENT' ? Role.STUDENT : Role.PROFESSOR,
            },
        })

        this.setId(new Uuid(userPrisma.id));
    }

    public setId(id: Uuid) {
        this._id = id;
    }

    public getId(): Uuid | undefined {
        return this._id;
    }

    public getName(): string {
        return this._name;
    }

    public getEmail(): string {
        return this._email;
    }

    private getPassword(): string {
        return this._password;
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