import { IClassSubject } from "./interfaces/ClassSubject.interface"

export class ClassSubject implements IClassSubject
{
    private _id: string
    private _name: string
    public static classSubjectList: IClassSubject[]

    constructor(name: string, id?: string) {
        this._id = id
        this._name = name
    }


    public getId(): string {
        return this._id
    }

    public setId(id: string): void {
        this._id = id
    }
    
    public getName(): string {
        return this._name
    }

    public setName(name: string): void {
        this._name = name
    }
}