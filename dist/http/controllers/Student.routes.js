"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const authorizationVerifier_1 = require("../middlewares/authorizationVerifier");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_1 = require("./student/get");
const create_1 = require("./student/create");
const get_all_1 = require("./student/get-all");
const remove_1 = require("./student/remove");
const update_1 = require("./student/update");
function studentRoutes(router) {
    router.get("/students", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], get_all_1.getAll);
    router.get("/students/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], get_1.get);
    router.delete("/students/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], remove_1.remove);
    router.put("/students/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], update_1.update);
    router.post("/students", create_1.create);
}
exports.studentRoutes = studentRoutes;
