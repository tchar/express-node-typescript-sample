import { ApiController } from "@app/controllers/api_controller";
import { IExpressModule } from "@app/express_module";
import { BasicAuthMiddleware } from "@app/middlewares/basic_auth";
import { IRouter } from "@app/router/router";
import { Router as ExpressRouter } from "express";

class ApiRouter implements IRouter {

    private router: ExpressRouter;
    private apiController: IExpressModule;
    private basicAuthMiddleware: IExpressModule;

    constructor() {
        this.router = ExpressRouter();
        this.basicAuthMiddleware = new BasicAuthMiddleware();
        this.apiController = new ApiController();
        this.registerRoutes();
    }

    public getExpressRouter(): ExpressRouter {
        return this.router;
    }

    private registerRoutes(): void {
        this.router.post("/endpoint", this.basicAuthMiddleware.use(), this.apiController.post());
        this.router.use("/endpoint", this.apiController.use());
    }
}

export { ApiRouter };
