"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRoutes = void 0;
const authorizationVerifier_1 = require("../middlewares/authorizationVerifier");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const get_all_1 = require("./class/get-all");
const get_1 = require("./class/get");
const get_posts_1 = require("./class/get-posts");
const remove_1 = require("./class/remove");
const update_1 = require("./class/update");
const create_1 = require("./class/create");
function classRoutes(router) {
    router.get("/classes", [ensureAuthenticated_1.ensureAuthenticated], get_all_1.getAll);
    router.get("/classes/:id", [ensureAuthenticated_1.ensureAuthenticated], get_1.get);
    router.get("/classes/:id/posts", [ensureAuthenticated_1.ensureAuthenticated], get_posts_1.getPosts);
    router.delete("/classes/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], remove_1.remove);
    router.put("/classes/:id", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], update_1.update);
    router.post("/classes", [ensureAuthenticated_1.ensureAuthenticated, authorizationVerifier_1.authorizationVerifier], create_1.create);
}
exports.classRoutes = classRoutes;
