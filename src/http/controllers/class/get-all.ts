import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ErrorHandler } from "../../../exceptions/ErrorHandler";
import { makeClassRepository } from "../../../repositories/factory/makeClassRepository";

export async function getAll(req: Request, res: Response, next: NextFunction) {
    try {
        const classRepository = makeClassRepository();
        const classList = await classRepository.getAll();
        let studentsList = [];
        let classObjectList = [];
        for (const classObject of classList) {
            let students = await classRepository.getStudents(classObject);
            if (students) {
                studentsList = students.map(student => {
                    return {
                        id: student.getId(),
                        name: student.user.getName(),
                        email: student.user.getEmail(),
                    };
                });
            }
            classObjectList.push({
                id: classObject.getId(),
                class: classObject.getName(),
                students: studentsList
            });
        }
        
        res.status(201).json({
            data: {
                classes: classObjectList,
            },
        });
    } catch (e) {
        next(ErrorHandler.handler(e));
    }
}