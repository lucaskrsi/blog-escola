import { validate as validateUuid } from "uuid";
import { prisma } from "./../database/config/client";
import { hashSync } from "bcrypt";
import { User } from "./User";
import { HttpException } from "../Exceptions/HttpException";

export class Student {

    private _id: string | undefined;
    private _userId: string | undefined;
    private _birthDate: string
    private _ra: string
    public user: User;
    public static studentList: Student[];

    public constructor(id: string | undefined = undefined, user: User, birthDate: string, ra: string) {
        if (typeof id !== "undefined") {
            validateUuid(id);
        }
        this._id = id;
        this._userId = user.getId();
        this._birthDate = birthDate;
        this._ra = ra;
        this.user = user
    }

    public static async create(name: string, email: string, password: string, birthDate: string, ra: string): Promise<Student> {
        let user = new User(undefined, name, email, password, "STUDENT");
        user = await user.create();

        let student = new Student(undefined, user, birthDate, ra);
        return student.create();
    }

    public static async update(id: string, name?: string | undefined, email?: string | undefined, password?: string | undefined, role?: string | undefined): Promise<User> {
        let userPrisma = await User.get(id);

        if (!userPrisma) {
            throw HttpException.NotFoundError("User not found");
        }

        return userPrisma.update(name, email, password, role);
    }

    // public async update(name?: string | undefined, email?: string | undefined, password?: string | undefined, birthDate?: string | undefined): Promise<Student> {
    //     let user = await prisma.student.update({
    //         where: {
    //             id: this.getId(),
    //         },
    //         data: {
    //             name: (typeof name == "string") ? name : this.getName(),
    //             email: (typeof email == "string") ? email : this.getEmail(),
    //             password: (typeof password == "string") ? hashSync(password, 10) : this.getPassword(),
    //             role: ['STUDENT', 'PROFESSOR'].includes(role) ? (role == 'STUDENT' ? Role.STUDENT : Role.PROFESSOR) : this.getRole() == 'STUDENT' ? Role.STUDENT : Role.PROFESSOR,
    //         },
    //     })

    //     this.setName(user.name);
    //     this.setEmail(user.email);
    //     this.setPassword(user.password);
    //     this.setRole(user.role);
    //     return this;
    // }


    public async create() {
        let student = await prisma.student.create({
            data: {
                userId: this.user.getId(),
                birthDate: this.getBirthDate(),
                ra: this.getRa(),
            },
        })

        this.setId(student.id);
        return this;
    }


    

    private setId(id: string){
        this._id = id;
    }

    public getId(): string {
        return this._id;
    }

    public getBirthDate(): string{
        return this._birthDate;
    }
    
    public getRa(): string{
        return this._ra;
    }
}