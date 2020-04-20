// 実践TypeScript 10-3-5参照
import Express from "express-session";
import admin from "firebase-admin";

declare global {
  namespace Express {
    interface SessionData {
      decodedToken: admin.auth.DecodedIdToken | null;
    }
  }
}
