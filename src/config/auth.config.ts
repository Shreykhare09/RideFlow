const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET is not defined");
}
const jwtSecret: string = secret;
export { jwtSecret };
