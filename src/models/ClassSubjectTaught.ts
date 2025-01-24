import { IClassSubject } from "./interfaces/ClassSubject.interface";
import { IClassSubjecteTaught } from "./interfaces/ClassSubjectTaught.interface";
import { IProfessor } from "./interfaces/Professor.interface";

export class ClassSubjectTaught implements IClassSubjecteTaught {
    private _id: string
    private _classSubject: IClassSubject
    private _professor: IProfessor

    constructor(classSubject: IClassSubject) {
        this._classSubject = classSubject
    }

    public getId(): string {
        return this._id;
    }

    public setId(id: string){
        this._id = id;
    }

    public getClassSubject(): IClassSubject {
        return this._classSubject;
    }

    public setClassSubject(classSubject: IClassSubject) {
        this._classSubject = classSubject;
    }

    public getProfessor(): IProfessor {
        return this._professor;
    }

    public setProfessor(professor: IProfessor) {
        this._professor = professor;
    }
}