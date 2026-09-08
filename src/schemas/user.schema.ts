import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(8),
  role: z.enum(["rider", "driver"]),
});

export const LoginUserSchema = z.object({
    email:z.email(),
    password: z.string().min(8),
});