import { ApiController } from "@app/controllers/api_controller";
import { IExpressModule } from "@app/express_module";
import { IRouter } from "@app/router/router";
import { Router as ExpressRouter } from "express";

class ApiRouter implements IRouter {

    private router: ExpressRouter;
    private apiController: IExpressModule;

    constructor() {
        this.router = ExpressRouter();
        this.apiController = new ApiController();
        this.registerRoutes();
    }

    public getExpressRouter(): ExpressRouter {
        return this.router;
    }

    private registerRoutes(): void {
        this.router.post("/pay", this.apiController.handle);
    }
}

export { ApiRouter };
