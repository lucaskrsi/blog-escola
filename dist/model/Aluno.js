"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
const Uuid_1 = require("./Uuid");
class Aluno {
    constructor(nome, ra, dataNascimento) {
        this._id = Uuid_1.Uuid.randomGenerator();
        this._nome = nome;
        this._ra = ra;
        this._dataNascimento = dataNascimento;
    }
}
exports.Aluno = Aluno;
Aluno.nomeTabela = "alunos";
