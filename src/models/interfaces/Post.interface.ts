import { IClass } from "./Class.interface"
import { IProfessor } from "./Professor.interface"
import { IUser } from "./User.interface"

export interface IPost {
    author: IProfessor,
    classObject: IClass;

    setId(id: string)
    getId(): string    
    setTitle(title: string)
    getTitle(): string    
    setContent(content: string)
    getContent(): string
    setAuthor(author: IProfessor)
    getAuthor(): IProfessor
    setClass(classObject: IClass)
    getClass(): IClass
    setPublished(published: boolean)
    isPublished(): boolean
    setCreatedAt(createdAt: string)
    getCreatedAt(): string
    setUpdatedAt(updatedAt: string)
    getUpdatedAt(): string
    
}