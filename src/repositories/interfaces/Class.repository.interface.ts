import { IClass } from "../../models/interfaces/Class.interface";
import { IPost } from "../../models/interfaces/Post.interface";
import { IStudent } from "../../models/interfaces/Student.interface";

export interface IClassRepository{
    get(id: string): Promise<IClass>
    getAll(): Promise<IClass[]>
    getPosts(classObject: IClass): Promise<IPost[]>
    getStudents(classObject: IClass): Promise<IStudent[]>
    create(post: IClass): Promise<IClass>
    update(name: string): Promise<IClass>
    delete(id: string): Promise<string>
    addStudent(classObject: IClass, student: IStudent): Promise<IClass>
}