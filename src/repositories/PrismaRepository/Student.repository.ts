import { IStudent } from "../../models/interfaces/Student.interface";
import { IStudentRepository } from "../interfaces/Student.repository.interface";

export class StudentRepository implements IStudentRepository {
    get(id: string): Promise<IStudent> {
        throw new Error("Method not implemented.");
    }
    getByEmail(email: string): Promise<IStudent> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<IStudent[]> {
        throw new Error("Method not implemented.");
    }
    create(user: IStudent): Promise<IStudent> {
        throw new Error("Method not implemented.");
    }
    update(id: string, name?: string, email?: string, password?: string, role?: string): Promise<IStudent> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

}