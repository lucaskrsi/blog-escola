import { UserRepository } from "../PrismaRepository/User.repository";

export function makeUserRepository(){
    return  new UserRepository();
}