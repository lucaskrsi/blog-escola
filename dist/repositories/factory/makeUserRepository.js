"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserRepository = void 0;
const User_repository_1 = require("../PrismaRepository/User.repository");
function makeUserRepository() {
    return new User_repository_1.UserRepository();
}
exports.makeUserRepository = makeUserRepository;
