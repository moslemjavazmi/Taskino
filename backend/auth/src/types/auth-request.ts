//backend/auth/src/types/auth-request.ts
import type { Request } from "express";

export interface AuthUser {
   id: string;     
  mobile?: string;
  roles: string[];
  permissions: string[];
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}
