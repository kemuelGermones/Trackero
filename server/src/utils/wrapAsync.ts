import { Request, Response, NextFunction } from "express";

type outerFunc = (req: Request, res: Response, next: NextFunction) => void;

type insideFunc = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

function wrapAsync(fn: insideFunc): outerFunc {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

export default wrapAsync;
