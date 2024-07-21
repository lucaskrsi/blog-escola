import { Router } from "express";
import { userRoutes } from "./controllers/User.routes";
import { studentRoutes } from "./controllers/Student.routes";
import { professorRoutes } from "./controllers/Professor.routes";
import { postRoutes } from "./controllers/Post.routes";
import { classRoutes } from "./controllers/Class.routes";

const router: Router = Router();

userRoutes(router);
studentRoutes(router);
professorRoutes(router);
postRoutes(router);
classRoutes(router);

export { router };