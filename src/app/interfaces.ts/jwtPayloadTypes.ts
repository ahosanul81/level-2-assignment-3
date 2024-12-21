import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      role: JwtPayload;
    }
  }
}
