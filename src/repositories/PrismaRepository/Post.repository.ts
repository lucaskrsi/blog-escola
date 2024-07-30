import { hashSync } from "bcrypt";
import { prisma } from "../../database/config/client";
import { HttpException } from "../../exceptions/HttpException";
import { IPostRepository } from "../interfaces/Post.repository.interface";
import { IPost } from "../../models/interfaces/Post.interface";
import { Class } from "../../models/Class";
import { Professor } from "../../models/Professor";
import { User } from "../../models/User";
import { Post } from "../../models/Post";
import { IClass } from "../../models/interfaces/Class.interface";
import { IProfessor } from "../../models/interfaces/Professor.interface";

export class PostRepository implements IPostRepository {

    async create(post: IPost): Promise<IPost> {
        let postPrisma = await prisma.post.create({
            data: {
                title: post.getTitle(),
                content: post.getContent(),
                published: post.isPublished(),
                authorId: post.author.getId(),
                classId: post.classObject.getId(),
            },
        })

        post.setId(postPrisma.id);
        return post;
    }

    async get(id: string): Promise<IPost> {
        const postPrisma = await prisma.post.findUnique({
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
            throw HttpException.NotFoundError("Post not found");
        }

        const post = new Post(
            new Class(
                postPrisma.class.name,
                postPrisma.class.id
            ),
            new Professor(
                new User(
                    postPrisma.author.user.name,
                    postPrisma.author.user.email,
                    postPrisma.author.user.password,
                    postPrisma.author.user.role,
                    postPrisma.author.user.id
                ),
                postPrisma.author.professorNumber,
                postPrisma.id
            ),
            postPrisma.title,
            postPrisma.content,
            postPrisma.published,
            postPrisma.id
        );

        post.setCreatedAt(postPrisma.createdAt.toString());
        post.setUpdatedAt(postPrisma.updatedAt.toString());

        return post;
    }

    async getAll(admin?: boolean): Promise<IPost[]> {
        let postPrisma = null;
        if (!admin) {
            postPrisma = await prisma.post.findMany({
                where: {
                    published: true,
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
        } else {
            postPrisma = await prisma.post.findMany({
                include: {
                    class: true,
                    author: {
                        include: {
                            user: true,
                        }
                    },
                }
            });
        }

        Post.postList = postPrisma.map((post) => {
            let postObject = new Post(
                new Class(
                    post.class.name,
                    post.class.id
                ),
                new Professor(
                    new User(
                        post.author.user.name,
                        post.author.user.email,
                        post.author.user.password,
                        post.author.user.role,
                        post.author.user.id
                    ),
                    post.author.professorNumber,
                    post.id
                ),
                post.title,
                post.content,
                post.published,
                post.id
            );

            postObject.setCreatedAt(post.createdAt.toString());
            postObject.setUpdatedAt(post.updatedAt.toString());
            return postObject;
        });

        return Post.postList;
    }

    async getAllSearch(keyword?: string): Promise<IPost[]> {
        const postPrisma = await prisma.post.findMany({
            where: {
                title: {
                    search: keyword,
                    mode: 'insensitive',
                },
                content: {
                    search: keyword,
                    mode: 'insensitive',
                },
                published: true
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

        Post.postList = postPrisma.map((post) => {
            let postObject = new Post(
                new Class(
                    post.class.name,
                    post.class.id
                ),
                new Professor(
                    new User(
                        post.author.user.name,
                        post.author.user.email,
                        post.author.user.password,
                        post.author.user.role,
                        post.author.user.id
                    ),
                    post.author.professorNumber,
                    post.id
                ),
                post.title,
                post.content,
                post.published,
                post.id
            );

            postObject.setCreatedAt(post.createdAt.toString());
            postObject.setUpdatedAt(post.updatedAt.toString());
            return postObject;
        });

        return Post.postList;
    }

    async getByClass(classObject: IClass): Promise<IPost[]> {
        const postPrisma = await prisma.post.findMany({
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

        Post.postList = postPrisma.map((post) => {
            let postObject = new Post(
                new Class(
                    post.class.name,
                    post.class.id
                ),
                new Professor(
                    new User(
                        post.author.user.name,
                        post.author.user.email,
                        post.author.user.password,
                        post.author.user.role,
                        post.author.user.id
                    ),
                    post.author.professorNumber,
                    post.id
                ),
                post.title,
                post.content,
                post.published,
                post.id
            );

            postObject.setCreatedAt(post.createdAt.toString());
            postObject.setUpdatedAt(post.updatedAt.toString());
            return postObject;
        });

        return Post.postList;
    }

    async getByAuthor(author: IProfessor): Promise<IPost[]> {
        const postPrisma = await prisma.post.findMany({
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

        Post.postList = postPrisma.map((post) => {
            let postObject = new Post(
                new Class(
                    post.class.name,
                    post.class.id
                ),
                new Professor(
                    new User(
                        post.author.user.name,
                        post.author.user.email,
                        post.author.user.password,
                        post.author.user.role,
                        post.author.user.id
                    ),
                    post.author.professorNumber,
                    post.id
                ),
                post.title,
                post.content,
                post.published,
                post.id
            );

            postObject.setCreatedAt(post.createdAt.toString());
            postObject.setUpdatedAt(post.updatedAt.toString());
            return postObject;
        });

        return Post.postList;
    }

    async update(id: string, classObject?: IClass, title?: string, content?: string, published?: boolean): Promise<IPost> {
        let postPrisma = await this.get(id);

        if (!postPrisma) {
            throw HttpException.NotFoundError("Post not found");
        }

        let post = null;
        if(classObject) {
            post = await prisma.post.update({
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
            
        }else{
            post = await prisma.post.update({
                where: {
                    id: postPrisma.getId(),
                },
                data: {
                    title: (typeof title == "string") ? title : postPrisma.getTitle(),
                    content: (typeof content == "string") ? content : postPrisma.getContent(),
                    published: (typeof published == "boolean") ? published : postPrisma.isPublished(),
                },
                include: {
                    class: true,
                }
            });
        }

        postPrisma.setTitle(post.title);
        postPrisma.setContent(post.content);
        postPrisma.setPublished(post.published);
        postPrisma.setClass(new Class(
            post.class.name,
            post.class.id
        ));
        postPrisma.setUpdatedAt(post.updatedAt.toString());

        return postPrisma;
    }

    async delete(id: string): Promise<string> {
        let postPrisma = await this.get(id);

        if (!postPrisma) {
            throw HttpException.NotFoundError("Post not found");
        }

        let post = await prisma.post.delete({
            where: {
                id: postPrisma.getId(),
            }
        });

        return post.id.toString();
    }

}