import { IUser } from "./User.interface"

export interface IProfessor {
    user: IUser

    setId(id: string)
    getId(): string    
    setUserId(id: string)
    getUserId(): string 
    setProfessorNumber(professorNumber: number)
    getProfessorNumber(): number    
}