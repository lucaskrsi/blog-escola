import { IUser } from "./User.interface"

export interface IStudent {
    user: IUser

    setId(id: string)
    getId(): string    
    setUserId(id: string)
    getUserId(): string 
    getBirthDate(): string    
    setBirthDate(birthDate : string)    
    getRa(): string
    setRa(ra : string)
}