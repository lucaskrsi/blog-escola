import { IStudent } from "../../models/interfaces/Student.interface";

export interface IStudentRepository{
    get(id: string): Promise<IStudent>
    getAll(): Promise<IStudent[]>
    create(user: IStudent): Promise<IStudent>
    update(id: string, birthDate?: string, ra?: string, name?: string, email?: string, password?: string): Promise<IStudent>
    delete(id: string): Promise<string>
}