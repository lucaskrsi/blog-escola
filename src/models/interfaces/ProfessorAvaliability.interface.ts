import { IProfessor } from "./Professor.interface";

export interface IProfessorAvaliability{
    getId(): string;
    setId(id: string): void;
    getDayOfWeek(): number;
    setDayOfWeek(dayOfWeek: number): void;
    getStartTime(): string;
    setStartTime(startTime: string): void;
    getEndTime(): string;
    setEndTime(endTime: string): void;
    getProfessor(): IProfessor
    setProfessor(professor: IProfessor): void;
}