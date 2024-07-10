import { IUser } from "../../models/interfaces/User.interface";

export interface IUserRepository{
    get(id: string): Promise<IUser>
    getByEmail(email: string): Promise<IUser>
    getAll(): Promise<IUser[]>
    create(user: IUser): Promise<IUser>
    update(id: string, name?: string, email?: string, password?: string, role?: string): Promise<IUser>
    delete(id: string): Promise<string>
    executeAuthentication(email: string, password: string)
}