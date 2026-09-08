import { Request, Response } from "express";
import pool from "../config/db";
import { createUserSchema, LoginUserSchema } from "../schemas/user.schema";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        message: "Invalid user data",
        errors: validatedData.error.issues,
      });
    }
    const { name, email, password, role } = validatedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, Password, role)
        VALUES ($1,$2,$3,$4)
        RETURNING id, name, email, role`,
      [name, email, hashedPassword, role],
    );
    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create user",
    });
  }
};
