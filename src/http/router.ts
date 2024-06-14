import { Router } from "express";
import { home } from "./routes/HomeRoute";
import { student } from "./routes/StudentRoute";
import { professor } from "./routes/ProfessorRoute";
import { user } from "./routes/UserRoute";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { authorizationVerifier } from "./middlewares/authorizationVerifier";


const router: Router = Router();

router.get("/", home.paginaInicial);

router.get("/students", [ensureAuthenticated, authorizationVerifier], student.getAll);
router.get("/students/:id", [ensureAuthenticated], student.get);
router.delete("/students/:id", [ensureAuthenticated], student.delete);
router.put("/students/:id", [ensureAuthenticated], student.update);
router.post("/students", student.create);

router.post("/users/login", user.login);
router.post("/users/refresh-token", user.refreshToken);
router.get("/users", [ensureAuthenticated, authorizationVerifier], user.getAll);
router.get("/users/:id", [ensureAuthenticated, authorizationVerifier], user.get);
router.delete("/users/:id", [ensureAuthenticated, authorizationVerifier], user.delete);
router.put("/users/:id", [ensureAuthenticated, authorizationVerifier], user.update);
router.post("/users", [ensureAuthenticated, authorizationVerifier], user.create);

router.get("/professors", [ensureAuthenticated, authorizationVerifier],  professor.getAll);
router.get("/professors/:id", [ensureAuthenticated, authorizationVerifier], professor.get);
router.delete("/professors/:id", [ensureAuthenticated, authorizationVerifier], professor.delete);
router.put("/professors/:id", [ensureAuthenticated, authorizationVerifier], professor.update);
router.post("/professors", professor.create);

router.get("/posts", [ensureAuthenticated],  post.getAll);
router.get("/posts/search", [ensureAuthenticated],  post.getSearched);
router.get("/posts/admin", [ensureAuthenticated, authorizationVerifier],  post.getAll);
router.get("/posts/:id", [ensureAuthenticated], post.get);
router.delete("/posts/:id", [ensureAuthenticated, authorizationVerifier], post.delete);
router.put("/posts/:id", [ensureAuthenticated, authorizationVerifier], post.update);
router.post("/posts", [ensureAuthenticated, authorizationVerifier], post.create);

export { router };