import { authorizationVerifier } from "../middlewares/authorizationVerifier";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { get } from "./student/get";
import { create } from "./student/create";
import { getAll } from "./student/get-all";
import { remove } from "./student/remove";
import { update } from "./student/update";

export function studentRoutes(router: Router):void{
    router.get("/students", [ensureAuthenticated, authorizationVerifier], getAll);
    router.get("/students/:id", [ensureAuthenticated, authorizationVerifier], get);
    router.delete("/students/:id", [ensureAuthenticated, authorizationVerifier], remove);
    router.put("/students/:id", [ensureAuthenticated, authorizationVerifier], update);
    router.post("/students", create);
}