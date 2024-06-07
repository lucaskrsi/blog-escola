import { Router } from "express";
import { home } from "./routes/HomeRoute";
import { aluno } from "./routes/AlunoRoute";
import { professor } from "./routes/ProfessorRoute";


const router: Router = Router();

router.get("/", home.paginaInicial);

router.get("/alunos", aluno.buscarTodos);
router.get("/alunos/:id", aluno.buscar);
router.delete("/alunos/:id", aluno.deletar);
router.put("/alunos/:id", aluno.atualizar);
router.post("/alunos", aluno.criar);

router.get("/professores", professor.buscarTodos);
router.get("/professores/:id", professor.buscar);
router.delete("/professores/:id", professor.deletar);
router.put("/professores/:id", professor.atualizar);
router.post("/professores", professor.criar);

export { router };