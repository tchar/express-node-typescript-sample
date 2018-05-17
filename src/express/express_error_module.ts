import { PrefixLogger } from "@app/logger/prefix_logger";
import { NextFunction, Request, Response } from "express";

interface IExpressErrorModule {
    use(err: Error, req: Request, res: Response, next: NextFunction): void;
}

class ExpressErrorModuleImpl implements IExpressErrorModule {

    private static logger: PrefixLogger = PrefixLogger.getLogger(ExpressErrorModuleImpl.name);

    public use(err: Error, req: Request, res: Response, next: any): void {
        ExpressErrorModuleImpl.logger.error({err}, err.message);
        res.status(500).send("Something went wrong!");
    }
}

export {IExpressErrorModule};
export {ExpressErrorModuleImpl};
