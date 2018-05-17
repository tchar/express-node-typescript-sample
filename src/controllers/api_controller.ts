import { ExpressModuleImpl } from "@app/express_module";
import { PrefixLogger } from "@app/logger/prefix_logger";
import { NextFunction, Request, Response } from "express";

class ApiController extends ExpressModuleImpl {
    private logger: PrefixLogger = PrefixLogger.getLogger(ApiController.name);

    public post(): (req: any, res: Response, next: NextFunction) => void {
        const thisContext = this;
        return (req: any, res: Response, next: NextFunction) => {
            thisContext.logger.addPrefix("post").info({ requestId: req.id }, "Incoming request");
            res.json({data: "some data"});
        };
    }
}

export { ApiController };
