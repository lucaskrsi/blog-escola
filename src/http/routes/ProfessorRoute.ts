import {Request, Response} from "express";

    class ProfessorRoute{

        async create (req: Request, res: Response){
            res.json({
                message: 'Welcome',
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

    export const professor = new ProfessorRoute();