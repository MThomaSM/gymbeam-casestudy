import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: Error,req: Request,res: Response,next: NextFunction) => {
  res.status(400).json({
    name: error.name,
    message: error.message,
    stackTrack: error.stack
  });
};

export default errorHandler;