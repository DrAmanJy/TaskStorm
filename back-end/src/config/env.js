import dotenv from "dotenv";

const env = "production";
dotenv.config({ path: `.env.${env}` });

export const port = process.env.PORT;
export const mongoUri = process.env.MONGO_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const origin = process.env.CORS_ORIGIN;
export const nodeEnv = env;
