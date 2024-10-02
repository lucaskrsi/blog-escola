import { authorizationVerifier } from "../middlewares/authorizationVerifier";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { create } from "./professor/create";
import { getAll } from "./professor/get-all";
import { remove } from "./professor/remove";
import { update } from "./professor/update";
import { get } from "./professor/get";

export function professorRoutes(router: Router):void{
    router.get("/professors", [ensureAuthenticated, authorizationVerifier], getAll);
    router.get("/professors/:id", [ensureAuthenticated], get);
    router.delete("/professors/:id", [ensureAuthenticated, authorizationVerifier], remove);
    router.put("/professors/:id", [ensureAuthenticated, authorizationVerifier], update);
    router.post("/professors", create);
}