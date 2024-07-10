import { IPost } from "./Post.interface";
import { IStudent } from "./Student.interface";

export interface IClass {
    students: IStudent[];
    posts: IPost[];

    setId(id: string)
    getId(): string    
    setName(id: string)
    getName(): string 
}