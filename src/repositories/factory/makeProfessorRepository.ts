import { ProfessorRepository } from "../PrismaRepository/Professor.repository";

export function makeProfessorRepository(){
    return  new ProfessorRepository();
}