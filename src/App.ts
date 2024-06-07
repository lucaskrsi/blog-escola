import express from 'express';
import { router } from "./http/router";

export class App {
    public server: express.Application = express();

    constructor() {
        this.server = express();
        this.middleware();
        this.router();
    }

    private middleware() {
        this.server.use(express.json());
    }

    public router() {
        this.server.use(router);
    }
}