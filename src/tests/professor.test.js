import jwt from 'jsonwebtoken';
import express from 'express';
import { app } from '../../dist/App';
import { describe, it, expect } from '@jest/globals';
import { TokenUser } from "../utils/TokenUser";
import request from 'supertest';
import { userRoutes } from '../../dist/http/controllers/User.routes';
import { z } from "zod";

//Authentication Function
const authenticateUser = async (loginData) => {
    const response = await request(app)
        .post('/users/login')
        .send(loginData);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toBeDefined();
    return response.body.data.token;
};

describe('User API', () => {

    it('should create a new Professor', async () => {
        
        const userData = {
            professorNumber: 1,
            name: "TesteCriarUser",
            email: "criar@gmail.com",
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

    it('should create and retrieve a Professor by ID', async () => {

        const userData = {
            professorNumber: 2,
            name: "TesteCriarBuscarUser",
            email: "buscar@gmail.com",
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
        console.log('status code: ', response.statusCode);
        console.log('Para ser pesquisado pelo ID, professor criado com sucesso: ', response.body);
        console.log('ID do professor criado: ', response.body.data.professorId);

        const loginData = {
            email: "buscar@gmail.com",
            password: "123456"
        };

        const token = await authenticateUser(loginData);
        const idProf = response.body.data.professorId;
        console.log('ID do professor: ', idProf);
        
        const pesquisaResponse = await request(app)
            .get(`/professors/${idProf}`)
            .set('Authorization', `Bearer ${token}`);

        expect(pesquisaResponse.statusCode).toBe(200);
        console.log('Professor recuperado com sucesso: ', pesquisaResponse.body.data)

    });

    //Retorna a lista de professores cadastrados    
    it('should retrieve all Professors', async () => {

        const loginData = {
            email: "buscar@gmail.com",
            password: "123456"
        };

        const token = await authenticateUser(loginData);

        const profResponse = await request(app)
            .get(`/professors`)
            .set('Authorization', `Bearer ${token}`);

        expect(profResponse.statusCode).toBe(200);
        console.log('Professores listados com sucesso: ', profResponse.body)
    });

    it('should create and delete a Professor by ID', async () => {

        const userData = {
            professorNumber: 3,
            name: "TesteCriarRemoverUser",
            email: "remover@gmail.com",
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
        console.log('status code: ', response.statusCode);
        console.log('Para ser removido pelo ID, professor criado com sucesso: ', response.body);
        console.log('ID do professor criado: ', response.body.data.professorId);


        const loginData = {
            email: "remover@gmail.com",
            password: "123456"
        };
        
        const token = await authenticateUser(loginData);
    
        const professorId = response.body.data.professorId;
    
        const deleteResponse = await request(app)
            .delete(`/professors/${professorId}`)
            .set('Authorization', `Bearer ${token}`);
    
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.message).toBe('Deleted successfully');
    
        const checkResponse = await request(app)
            .get(`/professors/${professorId}`)
            .set('Authorization', `Bearer ${token}`);

        console.log('Deleted Professor Data:', deleteResponse.body);

    });

    it('should create and update an existing Professor by ID', async () => {

        const userData = {
            professorNumber: 4,
            name: "TesteCriarAtualizarUser",
            email: "atualizar@gmail.com",
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
        console.log('status code: ', response.statusCode);
        console.log('Para ser atualizado pelo ID, professor criado com sucesso: ', response.body);
        console.log('ID do professor criado: ', response.body.data.professorId);

        const loginData = {
            email: "atualizar@gmail.com",
            password: "123456"
        };
        
        const token = await authenticateUser(loginData);

        const updatedProfessorData = {
            professorNumber: 3
        };

        const professorId = response.body.data.professorId; 

        const updateResponse = await request(app)
            .put(`/professors/${professorId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedProfessorData);

        expect(updateResponse.statusCode).toBe(200);
        console.log('Updated Professor Data:', updateResponse.body);

    });

});

