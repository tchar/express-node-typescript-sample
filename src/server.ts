import { environment } from "@app/environments/environment";
import { IExpressModule } from "@app/express_module";
import { PrefixLogger } from "@app/logger/prefix_logger";
import { RequestIdMiddleware } from "@app/middlewares/request_id";
import { ApiRouter } from "@app/router/api_router";
import { IRouter } from "@app/router/router";
import express, { Application } from "express";

class Server {
    private logger: PrefixLogger = PrefixLogger.getLogger(Server.name);
    private app: Application;
    private requestIdMiddleware: IExpressModule;
    private apiRouter: IRouter;

    constructor() {
        this.app = express();
        this.requestIdMiddleware = new RequestIdMiddleware();
        this.apiRouter = new ApiRouter();
        this.setup();
    }

    public start(): void {
        this.app.listen(environment.PORT);
        this.logger.info("Listening to port " + environment.PORT);
    }

    private setup(): void {
        this.app.use("/api", this.requestIdMiddleware.use());
        this.app.use("/api", this.apiRouter.getExpressRouter());
    }
}

export { Server };
