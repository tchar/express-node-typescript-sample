import { environment } from "@app/environments/environment";
import { ExpressModuleImpl } from "@app/express/express_module";
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

class RequestIdMiddleware extends ExpressModuleImpl {

    public use(req: any, res: Response, next: NextFunction): void {
        req.id = uuid();
        next();
    }
}

export {RequestIdMiddleware};
