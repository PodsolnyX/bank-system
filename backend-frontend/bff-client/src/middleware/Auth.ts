import { NextFunction, Request, Response } from "express";
import { MainInstance } from "request/MainInstance";

export const AuthMiddleware = () => (req: Request, res: Response, next: NextFunction) => {
    const User = req.cookies.Authorization
    if (!User) {
      res.sendStatus(401)
      return
    }
    
    MainInstance.defaults.headers.Authorization = User;
    return next()
  }