import { environment } from "@app/environments/environment";
import { ExpressModuleImpl } from "@app/express/express_module";
import { PrefixLogger } from "@app/logger/prefix_logger";
import { NextFunction, Request, Response } from "express";

class BasicAuthMiddleware extends ExpressModuleImpl {

    private logger: PrefixLogger = PrefixLogger.getLogger(BasicAuthMiddleware.name);

    public use(req: any, res: Response, next: NextFunction): void {
        if (!environment.BASIC_AUTH.ENABLED) {
            next();
            return;
        }
        let authorization: any = req.header("Authorization");
        if (environment.BASIC_AUTH == null || environment.BASIC_AUTH.AUTHS == null
            || authorization == null || typeof authorization !== "string") {
            this.logger.warn({ requestId: req.id }, "Basic Authorization Failed");
            res.setHeader("WWW-Authenticate", "Basic");
            res.status(401).send();
        }
        authorization = Buffer.from(authorization.replace("Basic ", ""), "base64").toString("utf-8").split(":");
        if (authorization.length !== 2 || environment.BASIC_AUTH.AUTHS[authorization[0]] !== authorization[1]) {
            this.logger.warn({ requestId: req.id }, "Basic Authorization Failed");
            res.setHeader("WWW-Authenticate", "Basic");
            res.status(401).send();
            return;
        }
        this.logger.info({ requestId: req.id }, "Basic Authorization Success");
        next();

    }

}

export {BasicAuthMiddleware};
