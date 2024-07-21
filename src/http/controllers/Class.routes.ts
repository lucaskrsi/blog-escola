import { authorizationVerifier } from "../middlewares/authorizationVerifier";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { Router } from "express";
import { getAll } from "./class/get-all";
import { get } from "./class/get";
import { getPosts } from "./class/get-posts";
import { remove } from "./class/remove";
import { update } from "./class/update";
import { create } from "./class/create";
import { addStudents } from "./class/add-students";
import { removeStudents } from "./class/remove-student";

export function classRoutes(router: Router):void{
    router.get("/classes", [ensureAuthenticated], getAll);
    router.get("/classes/:id", [ensureAuthenticated], get);
    router.get("/classes/:id/posts", [ensureAuthenticated], getPosts);
    router.delete("/classes/:id", [ensureAuthenticated, authorizationVerifier], remove);
    router.delete("/classes/:id/students", [ensureAuthenticated, authorizationVerifier], removeStudents);
    router.put("/classes/:id", [ensureAuthenticated, authorizationVerifier], update);
    router.post("/classes", [ensureAuthenticated, authorizationVerifier], create);
    router.post("/classes/:id/students", [ensureAuthenticated, authorizationVerifier], addStudents);
}