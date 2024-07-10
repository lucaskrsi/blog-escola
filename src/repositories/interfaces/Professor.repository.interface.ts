import { IProfessor } from "../../models/interfaces/Professor.interface";

export interface IProfessorRepository{
    get(id: string): Promise<IProfessor>
    getAll(): Promise<IProfessor[]>
    create(user: IProfessor): Promise<IProfessor>
    update(id: string, name?: string, email?: string, password?: string, role?: string): Promise<IProfessor>
    delete(id: string): Promise<string>
}