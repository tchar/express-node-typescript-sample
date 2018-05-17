import { NextFunction, Request, Response } from "express";

interface IExpressModule {

    get(): (req: Request, res: Response, next: NextFunction) => void;
    post(): (req: Request, res: Response, next: NextFunction) => void;
    put(): (req: Request, res: Response, next: NextFunction) => void;
    delete(): (req: Request, res: Response, next: NextFunction) => void;
    patch(): (req: Request, res: Response, next: NextFunction) => void;
    propfind(): (req: Request, res: Response, next: NextFunction) => void;
    proppatch(): (req: Request, res: Response, next: NextFunction) => void;
    use(): (req: Request, res: Response, next: NextFunction) => void;
}

abstract class ExpressModuleImpl implements IExpressModule {

    public get(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(405).send();
        };
    }
    public post(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(405).send();
        };
    }
    public put(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(405).send();
        };
    }
    public delete(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(405).send();
        };
    }
    public patch(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(405).send();
        };
    }
    public propfind(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(405).send();
        };
    }
    public proppatch(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(405).send();
        };
    }
    public use(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            res.status(405).send();
        };
    }
}

export {IExpressModule};
export {ExpressModuleImpl};
