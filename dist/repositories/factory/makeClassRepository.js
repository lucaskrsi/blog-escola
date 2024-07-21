"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeClassRepository = void 0;
const Class_repository_1 = require("../PrismaRepository/Class.repository");
function makeClassRepository() {
    return new Class_repository_1.ClassRepository();
}
exports.makeClassRepository = makeClassRepository;
