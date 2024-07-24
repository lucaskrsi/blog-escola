import { validate as validateUuid } from "uuid";
import { IUser } from "./interfaces/User.interface";
import { IProfessor } from "./interfaces/Professor.interface";
import { IPost } from "./interfaces/Post.interface";
import { IClass } from "./interfaces/Class.interface";

export class Post implements IPost {

    private _id?: string;
    private _title: string;
    private _content: string;
    private _createdAt: string;
    private _updatedAt: string;
    private _published: boolean;
    private _authorId: string;
    private _classId: string;
    public author: IProfessor;
    public classObject: IClass;
    public static postList: IPost[];

    public constructor(classObject: IClass, author: IProfessor, title: string, content: string, published: boolean = false, id?: string) {
        if (typeof id !== "undefined") {
            validateUuid(id);
        }
        this._id = id;
        this._title = title;
        this._content = content;
        this._published = published;
        this._authorId = author.getId();
        this._classId = classObject.getId();

        this.author = author;
        this.classObject = classObject;
    }

    public setId(id: string){
        this._id = id;
    }

    public getId(): string {
        return this._id;
    }

    setTitle(title: string) {
        this._title = title;
    }

    getTitle(): string {
        return this._title;
    }

    setContent(content: string) {
        this._content = content;
    }
    
    getContent(): string {
        return this._content;
    }

    setAuthor(author: IProfessor) {
        this._authorId = author.getId();
        this.author = author;
    }

    getAuthor(): IProfessor {
        return this.author;
    }

    setClass(classObject: IClass) {
        this._classId = classObject.getId();
        this.classObject = classObject;
    }

    getClass(): IClass {
       return this.classObject;
    }

    setPublished(published: boolean) {
        this._published = published;
    }

    isPublished(): boolean {
        return this._published;
    }

    setCreatedAt(createdAt: string) {
        this._createdAt = createdAt;
    }

    getCreatedAt(): string{
        return this._createdAt;
    }
    
    setUpdatedAt(updatedAt: string) {
        this._updatedAt = updatedAt;
    }

    getUpdatedAt(): string{
        return this._updatedAt;
    }
}