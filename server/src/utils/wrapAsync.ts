// Wraps a async function and catches any error if there is any

import { Request, Response, NextFunction } from "express";

function wrapAsync(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch((e) => next(e));
  };
}

export default wrapAsync;
