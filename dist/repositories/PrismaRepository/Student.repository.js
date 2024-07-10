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
exports.StudentRepository = void 0;
class StudentRepository {
    create(user) {
        throw new Error("Method not implemented.");
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    // async create(student: IStudent): Promise<IStudent> {
    //     // let userAlreadyExists = await this.getByEmail(student.user.getEmail());
    //     // if (userAlreadyExists) {
    //     //     throw HttpException.ConflictError("User already exists");
    //     // }
    //     // // let userPrisma = await prisma.user.create({
    //     // //     data:{
    //     // //         user: {
    //     // //             name: student.user.getName(),
    //     // //             email: student.user.getEmail(),
    //     // //             password: hashSync(student.user.getPassword(), 10),
    //     // //             role: student.user.isStudent() ? Role.STUDENT : Role.PROFESSOR,
    //     // //         },
    //     // //     },
    //     // // })
    //     // student.user.setId(userPrisma.id);
    //     // return student;
    // }
    update(id, name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
exports.StudentRepository = StudentRepository;
