import { Router } from "express";
// import { home } from "./controllers/HomeRoute";
// import { student } from "./controllers/StudentRoute";
// import { professor } from "./controllers/ProfessorRoute";
import { userRoutes } from "./controllers/User.routes";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { authorizationVerifier } from "./middlewares/authorizationVerifier";



const router: Router = Router();


userRoutes(router);

// router.get("/students", [ensureAuthenticated, authorizationVerifier], student.getAll);
// router.get("/students/:id", [ensureAuthenticated], student.get);
// router.delete("/students/:id", [ensureAuthenticated], student.delete);
// router.put("/students/:id", [ensureAuthenticated], student.update);
// router.post("/students", student.create);

// router.get("/professors", [ensureAuthenticated, authorizationVerifier],  professor.getAll);
// router.get("/professors/:id", [ensureAuthenticated, authorizationVerifier], professor.get);
// router.delete("/professors/:id", [ensureAuthenticated, authorizationVerifier], professor.delete);
// router.put("/professors/:id", [ensureAuthenticated, authorizationVerifier], professor.update);
// router.post("/professors", professor.create);

// router.get("/posts", [ensureAuthenticated],  post.getAll);
// router.get("/posts/search", [ensureAuthenticated],  post.getSearched);
// router.get("/posts/admin", [ensureAuthenticated, authorizationVerifier],  post.getAll);
// router.get("/posts/:id", [ensureAuthenticated], post.get);
// router.delete("/posts/:id", [ensureAuthenticated, authorizationVerifier], post.delete);
// router.put("/posts/:id", [ensureAuthenticated, authorizationVerifier], post.update);
// router.post("/posts", [ensureAuthenticated, authorizationVerifier], post.create);

export { router };