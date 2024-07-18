import { authorizationVerifier } from "../middlewares/authorizationVerifier";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { refreshToken } from "./user/refresh-token";
import { login } from "./user/login";
import { getAll } from "./user/get-all";
import { get } from "./user/get";
import { remove } from "./user/remove";
import { update } from "./user/update";
import { create } from "./user/create";

export function userRoutes(router: Router):void{
    router.post("/users/login", login);
    router.post("/users/refresh-token", refreshToken);
    router.get("/users", [ensureAuthenticated, authorizationVerifier], getAll);
    router.get("/users/:id", [ensureAuthenticated, authorizationVerifier], get);
    router.delete("/users/:id", [ensureAuthenticated, authorizationVerifier], remove);
    router.put("/users/:id", [ensureAuthenticated, authorizationVerifier], update);
    router.post("/users", create);
}