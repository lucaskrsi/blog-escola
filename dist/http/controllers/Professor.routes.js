"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professorRoutes = void 0;
const authorizationVerifier_1 = require("../middlewares/authorizationVerifier");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const create_1 = require("./professor/create");
const get_all_1 = require("./professor/get-all");
const remove_1 = require("./professor/remove");
const update_1 = require("./professor/update");
const get_1 = require("./professor/get");
function professorRoutes(router) {
    router.get("/professors", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], get_all_1.getAll);
    router.get("/professors/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], get_1.get);
    router.delete("/professors/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], remove_1.remove);
    router.put("/professors/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], update_1.update);
    router.post("/professors", create_1.create);
}
exports.professorRoutes = professorRoutes;
