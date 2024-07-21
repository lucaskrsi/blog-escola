import { validate as validateUuid } from "uuid";
import { IClass } from "./interfaces/Class.interface";
import { IStudent } from "./interfaces/Student.interface";
import { IPost } from "./interfaces/Post.interface";

export class Class implements IClass {

    private _id?: string;
    private _name?: string;
    public students: IStudent[];
    public posts: IPost[];
    public static classList: IClass[];

    public constructor(name: string, id?: string) {
        if (typeof id !== "undefined") {
            validateUuid(id);
        }
        this._id = id;
        this._name = name;
    }

    public setId(id: string){
        this._id = id;
    }

    public getId(): string {
        return this._id;
    }
   
    public setName(name: string){
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public addStudents(students: IStudent[]): void {
        this.students = students;
    }
}