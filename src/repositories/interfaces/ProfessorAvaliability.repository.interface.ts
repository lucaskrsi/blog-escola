import { IProfessor } from "../../models/interfaces/Professor.interface"
import { IProfessorAvaliability } from "../../models/interfaces/ProfessorAvaliability.interface"

export interface IProfessorAvaliabilityRepository{
    get(id: string): Promise<IProfessorAvaliability>
    getAll(): Promise<IProfessorAvaliability[]>
    create(user: IProfessorAvaliability): Promise<IProfessorAvaliability>
    update(id: string, professor?: IProfessor, dayOfWeek?: number, startTime?: string, endTime?: string): Promise<IProfessorAvaliability>
    delete(id: string): Promise<string>
}   