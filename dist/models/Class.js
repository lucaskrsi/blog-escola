"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const uuid_1 = require("uuid");
class Class {
    constructor(name, id) {
        if (typeof id !== "undefined") {
            (0, uuid_1.validate)(id);
        }
        this._id = id;
        this._name = name;
    }
    setId(id) {
        this._id = id;
    }
    getId() {
        return this._id;
    }
    setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    addStudents(students) {
        this.students = students;
    }
    getStudents() {
        return this.students;
    }
}
exports.Class = Class;
