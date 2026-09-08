import {z} from "zod";

export const jwtPayloadSchema = z.object({
    userId: z.number().int().positive(),
    role : z.enum(["rider","driver"]),
});