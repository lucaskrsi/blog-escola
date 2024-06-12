import express from 'express';
import { router } from "./http/router";
import { errorHandler } from './http/middlewares/errorHandler';

export class App {
    public server: express.Application = express();

    constructor() {
        this.server = express();
        this.middlewares();
    }

    private middlewares() {
        this.server.use(express.json());
        this.server.use(router);
        this.server.use(errorHandler);
    }
}