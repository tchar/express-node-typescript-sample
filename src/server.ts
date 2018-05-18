import { NotFoundController } from "@app/controllers/notfound_controller";
import { environment } from "@app/environments/environment";
import { ExpressErrorModuleImpl, IExpressErrorModule } from "@app/express/express_error_module";
import { IExpressModule } from "@app/express/express_module";
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
    private notFoundController: IExpressModule;
    private errorController: IExpressErrorModule;

    constructor() {
        this.app = express();
        this.requestIdMiddleware = new RequestIdMiddleware();
        this.apiRouter = new ApiRouter();
        this.notFoundController = new NotFoundController();
        this.errorController = new ExpressErrorModuleImpl();
        this.setup();
    }

    public start(): void {
        this.app.listen(environment.PORT);
        this.logger.info("Listening to port " + environment.PORT);
    }

    private setup(): void {
        this.app.use("/api", this.requestIdMiddleware.use.bind(this.requestIdMiddleware));
        this.app.use("/api", this.apiRouter.getExpressRouter());
        this.app.use(this.errorController.use.bind(this.errorController));
        this.app.use(this.notFoundController.use.bind(this.notFoundController));
    }
}

export { Server };
