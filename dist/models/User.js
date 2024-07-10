"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(name, email, password, role, id) {
        if (typeof id !== "undefined") {
            (0, uuid_1.validate)(id);
        }
        this._id = id;
        this._name = name;
        this._email = email;
        this._password = password;
        this._role = role;
    }
    setId(id) {
        (0, uuid_1.validate)(id);
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
    setEmail(email) {
        this._email = email;
    }
    getEmail() {
        return this._email;
    }
    setPassword(password) {
        this._password = password;
    }
    getPassword() {
        return this._password;
    }
    setRole(role) {
        this._role = role;
    }
    getRole() {
        return this._role;
    }
    isProfessor() {
        return (this.getRole() == User.professorRole);
    }
    isStudent() {
        return (this.getRole() == User.studentRole);
    }
}
exports.User = User;
User.studentRole = "STUDENT";
User.professorRole = "PROFESSOR";
