import { PostRepository } from "../PrismaRepository/Post.repository";

export function makePostRepository(){
    return  new PostRepository();
}