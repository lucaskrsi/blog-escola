import { IProfessor } from "./interfaces/Professor.interface";
import { IProfessorAvaliability } from "./interfaces/ProfessorAvaliability.interface";

export class ProfessorAvaliability implements IProfessorAvaliability
{
    private _id: string
    private _professor: IProfessor
    private _dayOfWeek: number
    private _startTime: string
    private _endTime: string
    public static professorAvaliabilityList: IProfessorAvaliability[]

    constructor(professor: IProfessor, dayOfWeek: number, startTime: string, endTime: string, id?: string) {
        this._id = id
        this._dayOfWeek = dayOfWeek;
        this._startTime = startTime;
        this._endTime = endTime;
    }

    public getId(): string {
        return this._id
    }

    public setId(id: string){
        this._id = id;
    }

    public getDayOfWeek(): number {
        return this._dayOfWeek
    }

    public setDayOfWeek(dayOfWeek: number) {
        this._dayOfWeek = dayOfWeek
    }

    public getStartTime(): string {
        return this._startTime
    }

    public setStartTime(startTime: string) {
        this._startTime = startTime
    }

    public getEndTime(): string {
        return this._endTime
    }

    public setEndTime(endTime: string) {
        this._endTime = endTime
    }

    public getProfessor(): IProfessor {
        return this._professor
    }

    public setProfessor(professor: IProfessor) {
        this._professor = professor
    }
}