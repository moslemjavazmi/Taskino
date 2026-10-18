// APIGateway/User/src/types/express.d.ts
import type { AuthUser } from "./auth-request";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
