import { IExpressModule } from "@app/express_module";
import { PrefixLogger } from "@app/logger/prefix_logger";
import { NextFunction, Request, Response } from "express";

class ApiController implements IExpressModule {

    private static logger: PrefixLogger = PrefixLogger.getLogger(ApiController.name);

    public handle(req: Request, res: Response, next: NextFunction) {
        ApiController.logger.info("Incoming request");
        res.send("Ok");
    }
}

export { ApiController };
