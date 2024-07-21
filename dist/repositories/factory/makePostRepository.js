"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePostRepository = void 0;
const Post_repository_1 = require("../PrismaRepository/Post.repository");
function makePostRepository() {
    return new Post_repository_1.PostRepository();
}
exports.makePostRepository = makePostRepository;
