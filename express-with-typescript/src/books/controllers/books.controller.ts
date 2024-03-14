import { Request, Response, NextFunction } from "express";

export function getBookHandler(req: Request, res: Response, next: NextFunction) {
  //   console.log("Second handler");
  res.send(req.params);
  next();
}
