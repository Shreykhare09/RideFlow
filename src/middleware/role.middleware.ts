import { Request, Response, NextFunction } from "express";
import { AuthUser } from "../types/auth";

export const authorizeRoles = (...allowedRoles: AuthUser["role"][]) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        if(!req.user){
            return res.status(401).json({
                message: "Authentication required"
            });
        }
        if(!allowedRoles.includes(req.user.role)){
          return res.status(403).json({
             message: "You do not have permission to access this resource",
          });
        }
        next();
    };
};