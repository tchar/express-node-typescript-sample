import { IExpressModule } from "@app/express_module";
import { logger } from "@app/logger";
import { NextFunction, Request, Response } from "express";

class ApiController implements IExpressModule {

    public handle(req: Request, res: Response, next: NextFunction) {
        logger.info("Incoming request");
        res.send("Ok");
    }
}

export { ApiController };
