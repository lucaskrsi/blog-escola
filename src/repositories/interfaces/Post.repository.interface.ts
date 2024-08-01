import { IClass } from "../../models/interfaces/Class.interface";
import { IPost } from "../../models/interfaces/Post.interface";
import { IProfessor } from "../../models/interfaces/Professor.interface";

export interface IPostRepository{
    get(id: string): Promise<IPost>
    getByAuthor(author: IProfessor): Promise<IPost[]>
    getByClass(author: IClass): Promise<IPost[]>
    getAll(admin?: boolean): Promise<IPost[]>
    getAllSearch(keyword?: string): Promise<IPost[]>
    create(post: IPost): Promise<IPost>
    update(id: string, classObject?: IClass, title?: string, content?: string, published?: boolean): Promise<IPost>
    delete(id: string): Promise<string>
}