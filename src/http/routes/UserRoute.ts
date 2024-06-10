import {Request, Response} from "express";
import { User } from "../../model/User";
import { z } from "zod";

    class UserRoute{

        public _user:User

        async create (req: Request, res: Response){
            const createStudentBody = z.object({
                name: z.string().length(80),
                email: z.string().email(),
                password: z.string(),
                role: z.string()
            });

            const {name, email, password, role} = createStudentBody.parse(req.body);
            
            this._user = await User.create(name, email, password, role);
            res.status(201).json({
                userId:this._user.getId
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

    export const user = new UserRoute();