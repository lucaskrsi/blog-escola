import { IClassSubject } from "../../models/interfaces/ClassSubject.interface"

export interface IClassSubjectRepository {
    get(id: string): Promise<IClassSubject>
    getAll(): Promise<IClassSubject[]>
    create(classSubject: IClassSubject): Promise<IClassSubject>
    update(name: string): Promise<IClassSubject>
    delete(id: string): Promise<string>
}