import { validate as validateUuid } from "uuid";
import { IUser } from "./interfaces/User.interface";
import { IStudent } from "./interfaces/Student.interface";

export class Student implements IStudent {

    private _id?: string;
    private _userId?: string;
    private _birthDate: string
    private _ra: string
    public user: IUser;
    public static studentList: IStudent[];

    public constructor(user: IUser, birthDate: string, ra: string, id?: string) {
        if (typeof id !== "undefined") {
            validateUuid(id);
        }
        this._id = id;
        this._userId = user.getId();
        this._birthDate = birthDate;
        this._ra = ra;
        this.user = user
    }

    public setId(id: string){
        this._id = id;
    }

    public getId(): string {
        return this._id;
    }
   
    public setUserId(id: string){
        this._userId = id;
    }

    public getUserId(): string {
        return this._userId;
    }

    public getBirthDate(): string{
        return this._birthDate;
    }
    
    public getRa(): string{
        return this._ra;
    }
}