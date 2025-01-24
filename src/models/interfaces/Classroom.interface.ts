import { IClass } from "./Class.interface";
import { ICourseCurriculum } from "./CourseCurriculum.interface";
import { IClassSubject } from "./ClassSubject.interface";
import { IProfessor } from "./Professor.interface";

export interface IClassroom{
    getId(): string;
    setId(id: string): void;
    getName(): string;
    setName(name: string): void;
    getClassroomPeriod(): string;
    setClassroomPeriod(classroomPeriod: string): void;
    getClassroomCapacity(): number;
    setClassroomCapacity(classroomCapacity: number): void;
    getClassSubject(): IClassSubject;
    setClassSubject(classSubject: IClassSubject): void;
    getHours(): number;
    setHours(hours: number): void;
    getClass(): IClass
    setClass(classObject: IClass): void;
    getProfessor(): IProfessor
    setProfessor(professor: IProfessor): void;
}