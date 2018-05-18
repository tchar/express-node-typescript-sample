import { ExpressModuleImpl } from "@app/express/express_module";
import { NextFunction, Request, Response } from "express";

class NotFoundController extends ExpressModuleImpl {
    public use(req: any, res: Response, next: NextFunction): void {
        res.status(404).send();
    }
}

export { NotFoundController};
