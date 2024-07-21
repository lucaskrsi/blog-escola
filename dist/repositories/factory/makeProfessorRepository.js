"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProfessorRepository = void 0;
const Professor_repository_1 = require("../PrismaRepository/Professor.repository");
function makeProfessorRepository() {
    return new Professor_repository_1.ProfessorRepository();
}
exports.makeProfessorRepository = makeProfessorRepository;
