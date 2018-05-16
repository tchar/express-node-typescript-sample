import { environment } from "@app/environments/environment";
import { PrefixLogger } from "@app/logger/prefix_logger";
import { ApiRouter } from "@app/router/api_router";
import { IRouter } from "@app/router/router";
import express, { Application } from "express";

class Server {
    private static logger: PrefixLogger = PrefixLogger.getLogger(Server.name);
    private app: Application;
    private apiRouter: IRouter;

    constructor() {
        this.app = express();
        this.apiRouter = new ApiRouter();
        this.setup();
    }

    public start(): void {
        this.app.listen(environment.PORT);
        Server.logger.info("Listening to port " + environment.PORT);
    }

    private setup(): void {
        this.app.use("/api", this.apiRouter.getExpressRouter());
    }
}

export { Server };
