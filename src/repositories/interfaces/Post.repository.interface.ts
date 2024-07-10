import { IPost } from "../../models/interfaces/Post.interface";

export interface IPostRepository{
    get(id: string): Promise<IPost>
    getByEmail(email: string): Promise<IPost>
    getAll(): Promise<IPost[]>
    create(user: IPost): Promise<IPost>
    update(id: string, name?: string, email?: string, password?: string, role?: string): Promise<IPost>
    delete(id: string): Promise<string>
}