import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { User } from "../../../models/User";
import { makeStudentRepository } from "../../../repositories/factory/makeStudentRepository";
import { Student } from "../../../models/Student";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const createBody = z.object({
            birthDate: z.string(),
            ra: z.string(),
            name: z.string().max(80),
            email: z.string().email(),
            password: z.string(),
        });

        const { name, email, password, birthDate, ra } = createBody.parse(req.body);

        const studentRepository = makeStudentRepository();

        const student = await studentRepository.create(new Student(new User(name, email, password, User.studentRole), birthDate, ra));
        res.status(201).json({
            data: { 
                studentId: student.getId(),
                userId: student.getUserId(),
             },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}