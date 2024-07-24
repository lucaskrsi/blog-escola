"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professor = void 0;
const uuid_1 = require("uuid");
class Professor {
    constructor(user, professorNumber, id) {
        if (typeof id !== "undefined") {
            (0, uuid_1.validate)(id);
        }
        this._id = id;
        this._userId = user.getId();
        this._professorNumber = professorNumber;
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
    setProfessorNumber(professorNumber) {
        this._professorNumber = professorNumber;
    }
    getProfessorNumber() {
        return this._professorNumber;
    }
}
exports.Professor = Professor;
