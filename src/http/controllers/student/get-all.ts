import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeStudentRepository } from "../../../repositories/factory/makeStudentRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const studentRepository = makeStudentRepository();
        const studentList = await studentRepository.getAll();
        let list = studentList.map(student => {
            return {
                birthDate: student.getBirthDate(),
                ra: student.getRa(),
                user:{
                    id: student.user.getId(),
                    name: student.user.getName(),
                    email: student.user.getEmail()
                }
            };
        });
        res.status(201).json({
            data: {
                students: list,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}