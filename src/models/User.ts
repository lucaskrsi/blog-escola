import { validate as validateUuid } from "uuid";
import { IUser } from "./interfaces/User.interface";

export class User implements IUser {

    private _id?: string;
    private _name: string
    private _email: string
    private _password: string
    private _role: string
    public static userList: IUser[];

    public constructor(name: string, email: string, password: string, role: string, id?: string) {
        if (typeof id !== "undefined") {
            validateUuid(id);
        }
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
    }

    public setId(id: string) {
        validateUuid(id);
        this._id = id;
    }

    public getId(): string | undefined {
        return this._id;
    }

    public setName(name: string) {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public setEmail(email: string) {
        this._email = email;
    }

    public getEmail(): string {
        return this._email;
    }

    public setPassword(password: string) {
        this._password = password;
    }

    public getPassword(): string {
        return this._password;
    }

    public setRole(role: string) {
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