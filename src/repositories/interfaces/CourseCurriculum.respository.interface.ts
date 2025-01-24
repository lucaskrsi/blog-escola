import { ICourseCurriculum } from "../../models/interfaces/CourseCurriculum.interface"

export interface ICourseCurriculumRepository {
    get(id: string): Promise<ICourseCurriculum>
    getAll(): Promise<ICourseCurriculum[]>
    create(classSubject: ICourseCurriculum): Promise<ICourseCurriculum>
    update(name: string): Promise<ICourseCurriculum>
    delete(id: string): Promise<string>
}