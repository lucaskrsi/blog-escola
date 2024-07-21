"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const uuid_1 = require("uuid");
class Post {
    constructor(classObject, author, title, content, published = false, id) {
        if (typeof id !== "undefined") {
            (0, uuid_1.validate)(id);
        }
        this._id = id;
        this._title = title;
        this._content = content;
        this._published = published;
        this._authorId = author.getId();
        this._classId = classObject.getId();
        this.author = author;
        this.classObject = classObject;
    }
    setId(id) {
        this._id = id;
    }
    getId() {
        return this._id;
    }
    setTitle(title) {
        this._title = title;
    }
    getTitle() {
        return this._title;
    }
    setContent(content) {
        this._content = content;
    }
    getContent() {
        return this._content;
    }
    setAuthor(author) {
        this._authorId = author.getId();
        this.author = author;
    }
    getAuthor() {
        return this.author;
    }
    setClass(classObject) {
        this._classId = classObject.getId();
        this.classObject = classObject;
    }
    getClass() {
        return this.classObject;
    }
    setPublished(published) {
        this._published = published;
    }
    isPublished() {
        return this._published;
    }
    setCreatedAt(createdAt) {
        this._createdAt = createdAt;
    }
    getCreatedAt() {
        return this._createdAt;
    }
    setUpdatedAt(updatedAt) {
        this._updatedAt = updatedAt;
    }
    getUpdatedAt() {
        return this._updatedAt;
    }
}
exports.Post = Post;
