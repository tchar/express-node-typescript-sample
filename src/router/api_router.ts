import { ApiController } from "@app/controllers/api_controller";
import { UserController } from "@app/controllers/user";
import { IExpressModule } from "@app/express/express_module";
import { BasicAuthMiddleware } from "@app/middlewares/basic_auth";
import { IRouter } from "@app/router/router";
import { DataService } from "@app/service/data_service";
import bodyParser from "body-parser";
import { Router as ExpressRouter } from "express";

class ApiRouter implements IRouter {

    private router: ExpressRouter;
    private apiController: IExpressModule;
    private basicAuthMiddleware: IExpressModule;
    private userController: IExpressModule;
    private dataService: DataService;

    constructor() {
        this.router = ExpressRouter();
        this.basicAuthMiddleware = new BasicAuthMiddleware();
        this.apiController = new ApiController();
        this.dataService = new DataService();
        this.userController = new UserController(this.dataService);
        this.registerRoutes();
    }

    public getExpressRouter(): ExpressRouter {
        return this.router;
    }

    private registerRoutes(): void {
        this.router.post("/endpoint",
            this.basicAuthMiddleware.use.bind(this.basicAuthMiddleware),
            this.apiController.post.bind(this.apiController));
        this.router.use("/endpoint", this.apiController.use.bind(this.apiController));

        this.router.post("/login",
            bodyParser.json(),
            this.userController.post.bind(this.userController));

        this.router.use("/login",
            this.userController.use.bind(this.userController));
    }
}

export { ApiRouter };
