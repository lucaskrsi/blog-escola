 import jwt from 'jsonwebtoken';
import supertest from 'supertest'; // Corrigido para importar supertest corretamente
import express from 'express';
import { professorRoutes } from './Professor.routes'; // Ajuste o caminho conforme a estrutura do seu projeto

const app = express();
const router = express.Router();
const token = jwt.sign({ userId: 'user' }, 'token');


professorRoutes(router);
app.use(router);

describe('Professor Routes', () => {
    it('should get all professors', async () => {
      const response = await supertest(app)
        .get('/professors, [ensureAuthenticated, authorizationVerifier], getAll')
        .set('Authorization', token);
      expect(response.status).toBe(200);
  
    });
})

// Exemplo de teste usando supertest
test('GET /professors', async () => {

  
    const response = await supertest(app)
    .get('/professors')
    .set('Authorization', token);

    /*
  const response = await supertest(app).get('/professors');
  expect(response.status).toBe(200);
  return response;*/
});



/*
import jwt from 'jsonwebtoken';
import supertest from 'supertest'; // Corrigido para importar supertest corretamente
import express from 'express';
import { professorRoutes } from './Professor.routes'; // Ajuste o caminho conforme a estrutura do seu projeto

const app = express();
const router = express.Router();
const token = jwt.sign({ userId: 'user' }, 'token');

professorRoutes(router);
app.use(router);

describe('Professor Routes', () => {
  it('should get all professors', async () => {
    const response = await supertest(app)
      .get('/professors, [ensureAuthenticated, authorizationVerifier], getAll')
      .set('Authorization', token);
    expect(response.status).toBe(200);

  });

  it('should get a professor by id', async () => {
    const response = await supertest(app)
      .get('/professors/1')
      .set('Authorization', token);
    expect(response.status).toBe(200);

  });

  it('should create a new professor', async () => {
    const response = await supertest(app)
      .post('/professors')
      .send({ name: 'New Professor' });
    expect(response.status).toBe(201);

  });

  it('should update a professor by id', async () => {
    const response = await supertest(app)
      .put('/professors/1')
      .send({ name: 'Updated Professor' })
      .set('Authorization', token);
    expect(response.status).toBe(200);
    
  });

  it('should delete a professor by id', async () => {
    const response = await supertest(app)
      .delete('/professors/1')
      .set('Authorization',token);
    expect(response.status).toBe(200);

  });
});


*/