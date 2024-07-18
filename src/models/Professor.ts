import { validate as validateUuid } from "uuid";
import { IUser } from "./interfaces/User.interface";
import { IProfessor } from "./interfaces/Professor.interface";

export class Professor implements IProfessor {

    private _id?: string;
    private _userId?: string;
    private _professorNumber: number
    public user: IUser;
    public static professorList: IProfessor[];

    public constructor(user: IUser, professorNumber: number, id?: string) {
        if (typeof id !== "undefined") {
            validateUuid(id);
        }
        this._id = id;
        this._userId = user.getId();
        this._professorNumber = professorNumber;
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

    public setProfessorNumber(professorNumber: number){
        this._professorNumber = professorNumber;
    }
    
    public getProfessorNumber(): number{
        return this._professorNumber;
    }
}