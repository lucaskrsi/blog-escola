import { IClass } from "./Class.interface"
import { IProfessor } from "./Professor.interface"
import { IUser } from "./User.interface"

export interface IPost {

    authors: IProfessor[];
    classObject: IClass;

    setId(id: string)
    getId(): string    
    setTitle(id: string)
    getTitle(): string    
    setContent(id: string)
    getContent(): string
    setAuthor(author: IProfessor)
    getAuthor(): IProfessor
    setClass(classObject: IClass)
    getClass(): IClass
    setPublished(id: string)
    getPublished(): string
    isPublished(): boolean
    
}