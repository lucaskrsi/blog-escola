import { IClass } from "../../models/interfaces/Class.interface"
import { IClassroom } from "../../models/interfaces/Classroom.interface"
import { IClassSubject } from "../../models/interfaces/ClassSubject.interface"
import { IProfessor } from "../../models/interfaces/Professor.interface"

export interface IClassroomRepository{
    getAll(): Promise<IClassroom[]>
    get(id: string): Promise<IClassroom>
    create(classroom: IClassroom): Promise<IClassroom>
    update(id: string, name?: string, classroomPeriod?: string, classroomCapacity?: number, hours?: number, professor?: IProfessor, classObject?: IClass, classSubject?: IClassSubject): Promise<IClassroom>
    delete(id: string): Promise<string>
}