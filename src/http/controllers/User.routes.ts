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
import { getByUser as getByUserProfessor } from "./professor/get-by-user";
import { getByUser as getByUserStudent } from "./student/get-by-user";

export function userRoutes(router: Router):void{
    router.post("/users/login", login);
    router.post("/users/refresh-token", refreshToken);
    router.get("/users", [ensureAuthenticated, authorizationVerifier], getAll);
    router.get("/users/:id", [ensureAuthenticated], get);
    router.get("/users/professor/:id", [ensureAuthenticated], getByUserProfessor);
    router.get("/users/student/:id", [ensureAuthenticated], getByUserStudent);
    router.delete("/users/:id", [ensureAuthenticated, authorizationVerifier], remove);
    router.put("/users/:id", [ensureAuthenticated, authorizationVerifier], update);
    router.post("/users", [ensureAuthenticated, authorizationVerifier], create);
}