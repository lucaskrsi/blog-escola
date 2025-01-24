import { IClass } from "./interfaces/Class.interface";
import { IClassroom } from "./interfaces/Classroom.interface";
import { ICourseCurriculum } from "./interfaces/CourseCurriculum.interface";
import { IClassSubject } from "./interfaces/ClassSubject.interface";
import { IProfessor } from "./interfaces/Professor.interface";

export class Classroom implements IClassroom{
    private _id: string;
    private _name: string;
    private _classroomPeriod: string;
    private _classroomCapacity: number;
    private _professor: IProfessor;
    private _classSubject: IClassSubject;
    private _hours: number;
    private _classObject: IClass
    public static classroomList: IClassroom[];

    public constructor(
        name: string,
        classroomPeriod: string,
        classroomCapacity: number,
        professor: IProfessor,
        classSubject: IClassSubject,
        hours: number,
        classObject: IClass,
        id?: string
    ){
        this._id = id;
        this._name = name;
        this._classroomPeriod = classroomPeriod;
        this._classroomCapacity = classroomCapacity;
        this._professor = professor;
        this._classSubject = classSubject;
        this._hours = hours;
        this._classObject = classObject;
    }

    public getId(): string {
        return this._id;
    }

    public setId(id: string){
        this._id = id;
    }

    public getClass(): IClass {
        return this._classObject;
    }

    public setClass(classObject: IClass) {
        this._classObject = classObject;
    }

    public getName(): string {
        return this._name;
    }

    public setName(name: string) {
        this._name = name;
    }

    public getClassroomPeriod(): string {
        return this._classroomPeriod;
    }

    public setClassroomPeriod(classroomPeriod: string) {
        this._classroomPeriod = classroomPeriod;
    }

    public getClassroomCapacity(): number {
        return this._classroomCapacity;
    }

    public setClassroomCapacity(classroomCapacity: number) {
        this._classroomCapacity = classroomCapacity;
    }

    public getProfessor(): IProfessor {
        return this._professor;
    }

    public setProfessor(professor: IProfessor) {
        this._professor = professor;
    }

    public getClassSubject(): IClassSubject {
        return this._classSubject;
    }

    public setClassSubject(classSubject: IClassSubject) {
        this._classSubject = classSubject;
    }

    public getHours(): number {
        return this._hours;
    }

    public setHours(hours: number) {
        this._hours = hours;
    }    
}