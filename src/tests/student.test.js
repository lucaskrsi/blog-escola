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
    expect(response.statusCode).toBe(201);
    expect(response.body.data.token).toBeDefined();
    return response.body.data.token;
};

describe('User API', () => {

    //Creating a Professor to authenticate
    it('should create a new Professor to authenticate Student', async () => {
            
        const userData = {
            professorNumber: 99,
            name: "TesteAutenticarStudent",
            email: "autenticar@gmail.com",
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
/*
    it('should create a new Studant', async () => {
        
        const userData = {
            name: "TesteCriarAluno",
            email: "criaraluno@gmail.com",
            password: "123456",
            birthDate: "01/10/1990",
            ra: "1010"
        }
        const studentResponse = z.object({
            studentId: z.string().max(36),
            userId: z.string().max(36),
        });
        const response = await request(app)
            .post('/students')
            .send(userData);
        expect(response.statusCode).toBe(201);
        console.log('Aluno criado com sucesso: ', response.body);
    });
*/
    it('should create and retrieve a Student by ID', async () => {

        const userData = {
            name: "TesteCriarBuscarAluno",
            email: "buscaraluno@gmail.com",
            password: "123456",
            birthDate: "01/11/1991",
            ra: "1111"
        }
        const studentResponse = z.object({
            studentId: z.string().max(36),
            userId: z.string().max(36),
        });
        const response = await request(app)
            .post('/students')
            .send(userData);
        expect(response.statusCode).toBe(201);
        console.log('status code: ', response.statusCode);
        console.log('Para ser pesquisado pelo ID, aluno criado com sucesso: ', response.body);
        console.log('ID do aluno criado: ', response.body.data.studentId);

        const loginData = {
            email: "autenticar@gmail.com",
            password: "123456"
        };

        const token = await authenticateUser(loginData);
        const idStudent = response.body.data.studentId;
        console.log('ID do aluno: ', idStudent);
        
        const pesquisaResponse = await request(app)
            .get(`/students/${idStudent}`)
            .set('Authorization', `Bearer ${token}`);

        expect(pesquisaResponse.statusCode).toBe(200);
        console.log('Aluno recuperado com sucesso: ', pesquisaResponse.body.data)

    });
/*
    //Retorna a lista de alunos cadastrados    
    it('should retrieve all Students', async () => {

        const loginData = {
            email: "buscaraluno@gmail.com",
            password: "123456"
        };

        const token = await authenticateUser(loginData);

        const stdResponse = await request(app)
            .get(`/students`)
            .set('Authorization', `Bearer ${token}`);

        expect(stdResponse.statusCode).toBe(201);
        console.log('Alunos listados com sucesso: ', stdResponse.body)
    });

    it('should create and delete a Student by ID', async () => {

        const userData = {
            name: "TesteCriarRemoverAluno",
            email: "removeraluno@gmail.com",
            password: "123456",
            birthDate: "01/12/1992",
            ra: "1212"
        }
        const studentResponse = z.object({
            studentId: z.string().max(36),
            userId: z.string().max(36),
        });
        const response = await request(app)
            .post('/students')
            .send(userData);
        expect(response.statusCode).toBe(201);
        console.log('status code: ', response.statusCode);
        console.log('Para ser removido pelo ID, aluno criado com sucesso: ', response.body);
        console.log('ID do aluno criado: ', response.body.data.studentId);


        const loginData = {
            email: "removeraluno@gmail.com",
            password: "123456"
        };
        
        const token = await authenticateUser(loginData);
    
        const idStudent = response.body.data.studentId;
    
        const deleteResponse = await request(app)
            .delete(`/students/${idStudent}`)
            .set('Authorization', `Bearer ${token}`);
    
        expect(deleteResponse.statusCode).toBe(200);
        expect(deleteResponse.body.message).toBe('Student deleted successfully');
    
        const checkResponse = await request(app)
            .get(`/students/${idStudent}`)
            .set('Authorization', `Bearer ${token}`);

        console.log('Deleted Student Data:', deleteResponse.body);

    });

    it('should create and update an existing Student by ID', async () => {

        const userData = {
            name: "TesteCriarAtualizarAluno",
            email: "atualizaraluno@gmail.com",
            password: "123456",
            birthDate: "01/01/1993",
            ra: "1313"
        }
        const studentResponse = z.object({
            studentId: z.string().max(36),
            userId: z.string().max(36),
        });
        const response = await request(app)
            .post('/students')
            .send(userData);
        expect(response.statusCode).toBe(201);
        console.log('status code: ', response.statusCode);
        console.log('Para ser atualizado pelo ID, aluno criado com sucesso: ', response.body);
        console.log('ID do aluno criado: ', response.body.data.studentId);

        const loginData = {
            email: "atualizaraluno@gmail.com",
            password: "123456"
        };
        
        const token = await authenticateUser(loginData);

        const updatedStudentData = {
            birthDate: "01/01/1985",
            ra: "1515"
        };

        const idStudent = response.body.data.studentId; 

        const updateResponse = await request(app)
            .put(`/students/${idStudent}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedStudentData);

        expect(updateResponse.statusCode).toBe(201);
        console.log('Updated Student Data:', updateResponse.body);

    });
*/
});

