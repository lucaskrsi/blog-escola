import { ICourseCurriculum } from "./interfaces/CourseCurriculum.interface";

export class CourseCurriculum implements ICourseCurriculum{
    private _id: string;
    private _name: string;
    public static courseCurriculumList: ICourseCurriculum[];

    constructor(name: string, id?: string) {
        this._name = name;
        this._id = id;
    }

    public getId(): string {
        return this._id;
    }

    public setId(id: string) {
        this._id = id;
    }

    public getName(): string {
        return this._name;
    }

    public setName(name: string) {
        this._name = name;
    }
}