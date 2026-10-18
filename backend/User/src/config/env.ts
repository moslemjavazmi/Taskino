// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().optional(),
  JWT_ACCESS_SECRET: z.string().min(20),
  JWT_ISSUER: z.string(),
  JWT_AUDIENCE: z.string(),
  KAFKA_BROKER: z.string().min(3),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

export const env = envSchema.parse(process.env);
