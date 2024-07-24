"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const uuid_1 = require("uuid");
class Student {
    constructor(user, birthDate, ra, id) {
        if (typeof id !== "undefined") {
            (0, uuid_1.validate)(id);
        }
        this._id = id;
        this._userId = user.getId();
        this._birthDate = birthDate;
        this._ra = ra;
        this.user = user;
    }
    setId(id) {
        this._id = id;
    }
    getId() {
        return this._id;
    }
    setUserId(id) {
        this._userId = id;
    }
    getUserId() {
        return this._userId;
    }
    setBirthDate(birthDate) {
        this._birthDate = birthDate;
    }
    getBirthDate() {
        return this._birthDate;
    }
    setRa(ra) {
        this._ra = ra;
    }
    getRa() {
        return this._ra;
    }
}
exports.Student = Student;
