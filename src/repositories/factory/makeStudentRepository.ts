import { StudentRepository } from "../PrismaRepository/Student.repository";

export function makeStudentRepository(){
    return  new StudentRepository();
}