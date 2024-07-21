import { authorizationVerifier } from "../middlewares/authorizationVerifier";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./post/get-all";
import { get } from "./post/get";
import { remove } from "./post/remove";
import { update } from "./post/update";
import { create } from "./post/create";

export function postRoutes(router: Router):void{
    router.get("/posts", [ensureAuthenticated, authorizationVerifier], getAll);
    router.get("/posts/:id", [ensureAuthenticated], get);
    router.delete("/posts/:id", [ensureAuthenticated, authorizationVerifier], remove);
    router.put("/posts/:id", [ensureAuthenticated, authorizationVerifier], update);
    router.post("/posts", [ensureAuthenticated, authorizationVerifier], create);
}