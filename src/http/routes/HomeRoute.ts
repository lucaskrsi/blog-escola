import {Request, Response} from "express";

    class HomeRoute{

        paginaInicial (req: Request, res: Response){
            res.json({
                message: 'Welcome',
            });
        }
    }

    export const home = new HomeRoute();