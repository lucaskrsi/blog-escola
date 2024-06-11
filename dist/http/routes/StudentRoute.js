"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.student = void 0;
const Student_1 = require("../../model/Student");
const zod_1 = require("zod");
class StudentRoute {
    constructor() {
        this._student = new Student_1.Student();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createStudentBody = zod_1.z.object({
                name: zod_1.z.string().length(80),
                email: zod_1.z.string().email(),
                birthDate: zod_1.z.date(),
                password: zod_1.z.string()
            });
            const { name, email, birthDate, password } = createStudentBody.parse(req.body);
            this._student.create(name, email, birthDate.toString(), password);
            res.status(201).json({});
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({
                message: 'Welcome',
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({
                message: 'Welcome',
            });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({
                message: 'Welcome',
            });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json({
                message: 'Welcome',
            });
        });
    }
}
exports.student = new StudentRoute();
