"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const authorizationVerifier_1 = require("../middlewares/authorizationVerifier");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const refresh_token_1 = require("./user/refresh-token");
const login_1 = require("./user/login");
const get_all_1 = require("./user/get-all");
const get_1 = require("./user/get");
const remove_1 = require("./user/remove");
const update_1 = require("./user/update");
const create_1 = require("./user/create");
function userRoutes(router) {
    router.post("/users/login", login_1.login);
    router.post("/users/refresh-token", refresh_token_1.refreshToken);
    router.get("/users", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], get_all_1.getAll);
    router.get("/users/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], get_1.get);
    router.delete("/users/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], remove_1.remove);
    router.put("/users/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], update_1.update);
    router.post("/users", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], create_1.create);
}
exports.userRoutes = userRoutes;
