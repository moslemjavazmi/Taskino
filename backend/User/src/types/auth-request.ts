// APIGateway/User/src/types/auth-request.ts
import { Request } from "express";

export type AuthUser = {
  id: string;
  roles: string[];
  permissions: string[];
};

export interface AuthRequest extends Request {
  user?: AuthUser;
}
