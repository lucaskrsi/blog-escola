import jwt from 'jsonwebtoken';
import express from 'express';
import { app } from '../../dist/App'; // Verifique o caminho
import { describe, it, expect } from '@jest/globals'; // Importar do jest
import { TokenUser } from "../utils/TokenUser";
import request from 'supertest';
import { userRoutes } from '../../dist/http/controllers/User.routes';
import { z } from "zod";

describe('User API', () => {
    //Criando um professor na base
    it('should create a new Professor', async () => {
        
        const userData = {
            professorNumber: 2,
            name: "Gumercindo Silverio",
            email: "gumercindo@gmail.com",
            password: "123456"
        }
        const professorResponse = z.object({
            professorId: z.string().max(36),
            userId: z.string().max(36),
        });
        const response = await request(app)
            .post('/professors')
            .send(userData);
        expect(response.statusCode).toBe(201);
        console.log('Professor criado com sucesso: ', response.body);
    });

    it('should retrieve a Professor by ID', async () => {

        //Autenticando o usuário
        // 1. Autenticar para obter um token válido
        const loginData = {
            email: "gumercindo@gmail.com",
            password: "123456"
        };

        const response = await request(app)
            .post('/users/login')
            .send(loginData);
        
        expect(response.statusCode).toBe(201); // Verifica se o status da resposta é 201 (Created) ou o adequado
        expect(response.body.data.token).toBeDefined(); // Verifica se o token JWT está presente na resposta
        expect(response.body.data.refreshToken).toBeDefined(); // Verifica se o refreshToken está presente na resposta
        const token = response.body.data.token;

        // 2. Consultar um professor pelo ID
        const professorId = '1c287f41-c6f5-4545-96e9-06e5afe14d04';

        const profResponse = await request(app)
            .get(`/professors/${professorId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(profResponse.statusCode).toBe(200);
        console.log('Professor recuperado com sucesso: ', profResponse.body)

    });

    //Retorna a lista de professores cadastrados    
    it('should retrieve all Professors', async () => {

        //Autenticando o usuário
        // 1. Autenticar para obter um token válido
        const loginData = {
            email: "gumercindo@gmail.com",
            password: "123456"
        };

        const response = await request(app)
            .post('/users/login')
            .send(loginData);
        
        expect(response.statusCode).toBe(201); // Verifica se o status da resposta é 201 (Created) ou o adequado
        expect(response.body.data.token).toBeDefined(); // Verifica se o token JWT está presente na resposta
        expect(response.body.data.refreshToken).toBeDefined(); // Verifica se o refreshToken está presente na resposta
        const token = response.body.data.token;

        // 2. Consultando os professores cadastrados
        const profResponse = await request(app)
            .get(`/professors`)
            .set('Authorization', `Bearer ${token}`);

        expect(profResponse.statusCode).toBe(201);
        console.log('Professores listados com sucesso: ', profResponse.body)
    });

    it('should update an existing professor', async () => {

        //Autenticando o usuário
        // 1. Autenticar para obter um token válido
        const loginData = {
            email: "gumercindo@gmail.com",
            password: "123456"
        };

        const response = await request(app)
            .post('/users/login')
            .send(loginData);
        
        expect(response.statusCode).toBe(201); // Verifica se o status da resposta é 201 (Created) ou o adequado
        expect(response.body.data.token).toBeDefined(); // Verifica se o token JWT está presente na resposta
        expect(response.body.data.refreshToken).toBeDefined(); // Verifica se o refreshToken está presente na resposta
        const token = response.body.data.token;

        // 2. Definir os dados atualizados do professor
        const updatedProfessorData = {
            professorNumber: 3
        };

        const professorId = '1c287f41-c6f5-4545-96e9-06e5afe14d04; // ID do professor que será atualizado

        // 3. Enviar a solicitação PUT para atualizar o professor
        const updateResponse = await request(app)
            .put(`/professors/${professorId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedProfessorData);

        // 4. Verificar a resposta da atualização
        expect(updateResponse.statusCode).toBe(201);
        const responseBody = updateResponse.body;

        // Imprimir os dados atualizados do professor
        console.log('Updated Professor Data:', updateResponse.body);
    });


    it('should delete an existing professor', async () => {

        //Autenticando o usuário
        // 1. Autenticar para obter um token válido
        const loginData = {
            email: "adobaldo@gmail.com",
            password: "123456"
        };

        const response = await request(app)
            .post('/users/login')
            .send(loginData);
        
        expect(response.statusCode).toBe(201); // Verifica se o status da resposta é 201 (Created) ou o adequado
        expect(response.body.data.token).toBeDefined(); // Verifica se o token JWT está presente na resposta
        expect(response.body.data.refreshToken).toBeDefined(); // Verifica se o refreshToken está presente na resposta
        const token = response.body.data.token;
    
        const professorId = '89db39f0-6262-468f-a957-7678fa73c9ce'; // ID do professor que será removido
    
        // 2. Enviar a solicitação DELETE para remover o professor
        const deleteResponse = await request(app)
            .delete(`/professors/${professorId}`)
            .set('Authorization', `Bearer ${token}`);
    
        // 3. Verificar a resposta da remoção
        expect(deleteResponse.statusCode).toBe(200); // Código de status esperado para sucesso na remoção
        expect(deleteResponse.body.message).toBe('Deleted successfully');
    
        // 4. Confirmar que o professor foi removido
        const checkResponse = await request(app)
            .get(`/professors/${professorId}`)
            .set('Authorization', `Bearer ${token}`);

        // Imprimir o retorno da remoção bem sucedida
        console.log('Deleted Professor Data:', deleteResponse.body);

    });
    
});

