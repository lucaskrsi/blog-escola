"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeStudentRepository = void 0;
const Student_repository_1 = require("../PrismaRepository/Student.repository");
function makeStudentRepository() {
    return new Student_repository_1.StudentRepository();
}
exports.makeStudentRepository = makeStudentRepository;
