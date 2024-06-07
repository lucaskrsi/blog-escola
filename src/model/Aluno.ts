import { UUID, randomUUID } from "crypto";
import { Uuid } from "./Uuid";

export class Aluno {
    private _id: Uuid;
    private _nome: string;
    private _ra: string;
    private _dataNascimento: string;
    public static nomeTabela: string = "alunos";

    constructor(nome: string, ra: string, dataNascimento: string) {
        this._id = Uuid.randomGenerator();
        this._nome = nome;
        this._ra = ra;
        this._dataNascimento = dataNascimento;
    }

    // async getAll() : ?Promise<Book[]>
    // {

    // }

    // async getBook(id : Uuid) : ?Proimise<Book> 
    // {

    // }
}