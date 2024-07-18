import { authorizationVerifier } from "../middlewares/authorizationVerifier";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { get } from "./student/get";
import { create } from "./professor/create";
import { getAll } from "./professor/get-all";
import { remove } from "./professor/remove";
import { update } from "./professor/update";

export function professorRoutes(router: Router):void{
    router.get("/professors", [ensureAuthenticated, authorizationVerifier], getAll);
    router.get("/professors/:id", [ensureAuthenticated, authorizationVerifier], get);
    router.delete("/professors/:id", [ensureAuthenticated, authorizationVerifier], remove);
    router.put("/professors/:id", [ensureAuthenticated, authorizationVerifier], update);
    router.post("/professors", create);
}