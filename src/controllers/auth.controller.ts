import { Request, Response } from "express";
import pool from "../config/db";
import { LoginUserSchema } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import jwt from"jsonwebtoken";
import { jwtSecret } from "../config/auth.config";

export const loginUser = async (req: Request, res: Response)=>{
    try{
        const validatedData = LoginUserSchema.safeParse(req.body);
        if(!validatedData.success){
            return res.status(400).json({
                message: "Invalid login data",
                errors: validatedData.error?.issues,
            });
        }
        const { email, password } = validatedData.data;
        const result = await pool.query(`
            SELECT id,name,email,password,role FROM users WHERE email = $1`,[email]
            );
        if(result.rows.length === 0){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = jwt.sign(
            {
                userId: user.id,
                role:user.role,
            },
            jwtSecret,
            {
                expiresIn: "1h",
            }
        );
        return res.status(200).json({
            message : "Login successful",
            token,
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error){
        console.error("Login error:",error);
        return res.status(500).json({
            message:"Login failed",
        });
    }
}