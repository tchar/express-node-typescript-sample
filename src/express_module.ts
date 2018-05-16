import { NextFunction, Request, Response } from "express";

interface IExpressModule {
    handle(req: Request, res: Response, next: NextFunction): void;
}

export {IExpressModule};
