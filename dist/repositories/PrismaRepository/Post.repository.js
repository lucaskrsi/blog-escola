"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const client_1 = require("../../database/config/client");
const HttpException_1 = require("../../exceptions/HttpException");
const Class_1 = require("../../models/Class");
const Professor_1 = require("../../models/Professor");
const User_1 = require("../../models/User");
const Post_1 = require("../../models/Post");
class PostRepository {
    create(post) {
        return __awaiter(this, void 0, void 0, function* () {
            let postPrisma = yield client_1.prisma.post.create({
                data: {
                    title: post.getTitle(),
                    content: post.getContent(),
                    published: post.isPublished(),
                    authorId: post.author.getId(),
                    classId: post.classObject.getId(),
                },
            });
            post.setId(postPrisma.id);
            return post;
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postPrisma = yield client_1.prisma.post.findUnique({
                where: {
                    id: id,
                },
                include: {
                    class: true,
                    author: {
                        include: {
                            user: true,
                        }
                    },
                }
            });
            if (!postPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Post not found");
            }
            const post = new Post_1.Post(new Class_1.Class(postPrisma.class.name, postPrisma.class.id), new Professor_1.Professor(new User_1.User(postPrisma.author.user.name, postPrisma.author.user.email, postPrisma.author.user.password, postPrisma.author.user.role, postPrisma.author.user.id), postPrisma.author.professorNumber, postPrisma.id), postPrisma.title, postPrisma.content, postPrisma.published, postPrisma.id);
            post.setCreatedAt(postPrisma.createdAt.toString());
            post.setUpdatedAt(postPrisma.updatedAt.toString());
            return post;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const postPrisma = yield client_1.prisma.post.findMany({
                include: {
                    class: true,
                    author: {
                        include: {
                            user: true,
                        }
                    },
                }
            });
            Post_1.Post.postList = postPrisma.map((post) => {
                let postObject = new Post_1.Post(new Class_1.Class(post.class.name, post.class.id), new Professor_1.Professor(new User_1.User(post.author.user.name, post.author.user.email, post.author.user.password, post.author.user.role, post.author.user.id), post.author.professorNumber, post.id), post.title, post.content, post.published, post.id);
                postObject.setCreatedAt(post.createdAt.toString());
                postObject.setUpdatedAt(post.updatedAt.toString());
                return postObject;
            });
            return Post_1.Post.postList;
        });
    }
    getByClass(classObject) {
        return __awaiter(this, void 0, void 0, function* () {
            const postPrisma = yield client_1.prisma.post.findMany({
                where: {
                    classId: classObject.getId(),
                },
                include: {
                    class: true,
                    author: {
                        include: {
                            user: true,
                        }
                    },
                }
            });
            Post_1.Post.postList = postPrisma.map((post) => {
                let postObject = new Post_1.Post(new Class_1.Class(post.class.name, post.class.id), new Professor_1.Professor(new User_1.User(post.author.user.name, post.author.user.email, post.author.user.password, post.author.user.role, post.author.user.id), post.author.professorNumber, post.id), post.title, post.content, post.published, post.id);
                postObject.setCreatedAt(post.createdAt.toString());
                postObject.setUpdatedAt(post.updatedAt.toString());
                return postObject;
            });
            return Post_1.Post.postList;
        });
    }
    getByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            const postPrisma = yield client_1.prisma.post.findMany({
                where: {
                    classId: author.getId(),
                },
                include: {
                    class: true,
                    author: {
                        include: {
                            user: true,
                        }
                    },
                }
            });
            Post_1.Post.postList = postPrisma.map((post) => {
                let postObject = new Post_1.Post(new Class_1.Class(post.class.name, post.class.id), new Professor_1.Professor(new User_1.User(post.author.user.name, post.author.user.email, post.author.user.password, post.author.user.role, post.author.user.id), post.author.professorNumber, post.id), post.title, post.content, post.published, post.id);
                postObject.setCreatedAt(post.createdAt.toString());
                postObject.setUpdatedAt(post.updatedAt.toString());
                return postObject;
            });
            return Post_1.Post.postList;
        });
    }
    update(id, classObject, title, content, published) {
        return __awaiter(this, void 0, void 0, function* () {
            let postPrisma = yield this.get(id);
            if (!postPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Post not found");
            }
            let post = yield client_1.prisma.post.update({
                where: {
                    id: postPrisma.getId(),
                },
                data: {
                    title: (typeof title == "string") ? title : postPrisma.getTitle(),
                    content: (typeof content == "string") ? content : postPrisma.getContent(),
                    published: (typeof published == "boolean") ? published : postPrisma.isPublished(),
                    classId: (typeof classObject == "object") ? classObject.getId() : postPrisma.classObject.getId(),
                },
                include: {
                    class: true,
                }
            });
            postPrisma.setTitle(post.title);
            postPrisma.setContent(post.content);
            postPrisma.setPublished(post.published);
            postPrisma.setClass(new Class_1.Class(post.class.name, post.class.id));
            postPrisma.setUpdatedAt(post.updatedAt.toString());
            return postPrisma;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let postPrisma = yield this.get(id);
            if (!postPrisma) {
                throw HttpException_1.HttpException.NotFoundError("Post not found");
            }
            let post = yield client_1.prisma.post.delete({
                where: {
                    id: postPrisma.getId(),
                }
            });
            return post.id.toString();
        });
    }
}
exports.PostRepository = PostRepository;
