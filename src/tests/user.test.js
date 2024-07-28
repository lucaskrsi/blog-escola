import jwt from 'jsonwebtoken';
import supertest from 'supertest'; // Corrigido para importar supertest corretamente
import express from 'express';
import request from 'supertest'; // Use apenas import
import { app } from '../../dist/App'; // Verifique o caminho
import { describe, it, expect } from '@jest/globals'; // Importar do jest
import { TokenUser } from "../utils/TokenUser";
import { userRoutes } from '../../dist/http/controllers/User.routes';

//const token = jwt.sign({ userId: 'user' }, 'token');

describe('User API', () => {
    it('should create a new user', async () => {
        const token = await TokenUser.generateToken("user");
        const userData = { name: 'Test User', email: 'test@example.com', password: 'teste123', role: 'Aluno'};
        const response = await request(app)
            .post('/users')
            .set('Authorization', token)  // Adicione seu token aqui
            .send(userData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(userData));
    });
/*
    it('should retrieve an existing user', async () => {
        const userData = { name: 'Jane Doe', email: 'jane@example.com'};
        const createUserResponse = await request(app).post('/users').send(userData);
        const userId = createUserResponse.body.id;
        const getUserResponse = await request(app).get(`/users/${userId}`);
        expect(getUserResponse.statusCode).toBe(200);
        expect(getUserResponse.body).toEqual(expect.objectContaining(userData));
    });

    it('should update as existing user', async() => {
        const user = await request(app)
        .post('/users')
        .send(updatedUserData)
        .expect(200)
        .then((response) => {
            expect(response.body.name).toBe(updatedUserData.name)
            expect(response.body.email).toBe(updatedUserData.email)
        });
    });
    */
});

