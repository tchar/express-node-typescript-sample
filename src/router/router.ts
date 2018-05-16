import { Router } from "express";

interface IRouter {
    getExpressRouter(): Router;
}

export {IRouter};
