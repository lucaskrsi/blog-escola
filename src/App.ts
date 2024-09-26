import express from 'express';
import { router } from './http/router';
import { errorHandler } from './http/middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json';
import cors from 'cors';

export class App {
    public server: express.Application = express();

    corsOptions = {
        origin: "*"
      }

    constructor() {
        this.middlewares();
    }

    private middlewares() {
        this.server.use(cors(this.corsOptions))
        this.server.use(express.json());
        this.server.use(router);
        this.server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
        this.server.use(errorHandler);
    }
}

export const app = new App().server;
