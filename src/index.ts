import { environment } from "@app/environments/environment";
import { logger } from "@app/logger";
import { ApiRouter } from "@app/router/api_router";
import { IRouter } from "@app/router/router";
import express, { Application } from "express";

class Server {
    private app: Application;
    private apiRouter: IRouter;

    constructor() {
        this.app = express();
        this.apiRouter = new ApiRouter();
        this.setup();
    }

    public start(): void {
        this.app.listen(environment.PORT);
        logger.info("Listening to port " + environment.PORT);
    }

    private setup(): void {
        this.app.use("/api", this.apiRouter.getExpressRouter());
    }
}

const server: Server = new Server();
server.start();
