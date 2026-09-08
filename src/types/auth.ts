export interface AuthUser {
    userId: number;
    role: "rider" | "driver";
}

declare global{
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}