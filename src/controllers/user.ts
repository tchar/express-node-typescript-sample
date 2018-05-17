import { ExpressModuleImpl } from "@app/express/express_module";
import { PrefixLogger } from "@app/logger/prefix_logger";
import { DataService } from "@app/services/data_service";
import { NextFunction, Request, Response } from "express";

class UserController extends ExpressModuleImpl {
    private dataService: DataService;
    private logger: PrefixLogger = PrefixLogger.getLogger(UserController.name);

    constructor(dataService: DataService) {
        super();
        this.dataService = dataService;
    }

    public post(req: any, res: Response, next: NextFunction): void {
        const postLogger: PrefixLogger = this.logger.addPrefix("post");
        postLogger.info({ requestId: req.id }, "Incoming request");
        this.dataService.login(req.body.username, req.body.password)
        .then((_: any) => {
            this.logger.addPrefix("post").info({requestId: req.id}, "Logged in successfully");
            res.send();
        })
        .catch((err: Error) => {
            this.logger.addPrefix("post").warn({err, requestId: req.id}, err.message);
            res.setHeader("WWW-Authenticate", "Basic");
            res.status(401).send("Invalid username or password");
        });
    }
}

export { UserController };
