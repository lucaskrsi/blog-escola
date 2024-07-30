"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const authorizationVerifier_1 = require("../middlewares/authorizationVerifier");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./post/get-all");
const get_1 = require("./post/get");
const remove_1 = require("./post/remove");
const update_1 = require("./post/update");
const create_1 = require("./post/create");
const get_all_admin_1 = require("./post/get-all-admin");
const get_all_search_1 = require("./post/get-all-search");
function postRoutes(router) {
    router.get("/posts/admin", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], get_all_admin_1.getAllAdmin);
    router.get("/posts/search", [ensureAuthenticated_1.ensureAuthenticated], get_all_search_1.getAllSearch);
    router.get("/posts", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/posts/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.delete("/posts/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], remove_1.remove);
    router.put("/posts/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], update_1.update);
    router.post("/posts", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], create_1.create);
}
exports.postRoutes = postRoutes;
