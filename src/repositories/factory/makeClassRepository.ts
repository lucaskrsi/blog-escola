import { ClassRepository } from "../PrismaRepository/Class.repository";

export function makeClassRepository(){
    return  new ClassRepository();
}