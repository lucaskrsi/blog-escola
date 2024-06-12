import { Router } from "express";
import { home } from "./routes/HomeRoute";
import { student } from "./routes/StudentRoute";
import { professor } from "./routes/ProfessorRoute";
import { user } from "./routes/UserRoute";


const router: Router = Router();

router.get("/", home.paginaInicial);

router.get("/students", student.getAll);
router.get("/students/:id", student.get);
router.delete("/students/:id", student.delete);
router.put("/students/:id", student.update);
router.post("/students", student.create);

router.get("/users", user.getAll);
router.get("/users/:id", user.get);
router.delete("/users/:id", user.delete);
router.put("/users/:id", user.update);
router.post("/users", user.create);

router.get("/professors", professor.getAll);
router.get("/professors/:id", professor.get);
router.delete("/professors/:id", professor.delete);
router.put("/professors/:id", professor.update);
router.post("/professors", professor.create);

export { router };