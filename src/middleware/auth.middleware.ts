import { Request, Response, NextFunction, response } from "express";
import jwt from "jsonwebtoken";
import { AuthUser } from "../types/auth";
import { jwtPayloadSchema } from "../schemas/auth.schema";
import { jwtSecret } from "../config/auth.config";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try{
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({
            message: "Authorization header missing",
        });
    }
    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Token missing",
        });
    }
    const decoded = jwt.verify(
        token,
        jwtSecret
    );
    const validatedPayload = jwtPayloadSchema.safeParse(decoded);
    if(!validatedPayload.success){
        return res.status(401).json({
            message: "Invalid token payload",
        });
    }
    req.user = validatedPayload.data;
    console.log("Authenticated user:", req.user);

    next();
  } catch(error){
    return res.status(401).json({
        message: "Invalid or expired token",
    });
  }
};
