import {Request, Response} from "express";
import { Student } from "../../model/Student";
import { z } from "zod";

    class StudentRoute{

        public _student:Student = new Student();

        async create (req: Request, res: Response){
            const createStudentBody = z.object({
                name: z.string().length(80),
                email: z.string().email(),
                birthDate: z.date(),
                password: z.string()
            });

            const {name, email, birthDate, password} = createStudentBody.parse(req.body);
            
            this._student.create(name, email, birthDate.toString() , password);
            res.status(201).json({
            });
        }

        async update (req: Request, res: Response){
            res.json({
                message: 'Welcome',
            });
        }
        
        async delete (req: Request, res: Response){
            res.json({
                message: 'Welcome',
            });
        }
       
        async get (req: Request, res: Response){
            res.json({
                message: 'Welcome',
            });
        }

        async getAll (req: Request, res: Response){
            res.json({
                message: 'Welcome',
            });
        }
        
    }

    export const student = new StudentRoute();