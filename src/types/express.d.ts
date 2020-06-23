import Express from "express";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import admin from "firebase-admin";

declare global {
  namespace Express {
    interface Request {
      firebaseServer?: admin.app.App;
    }
    interface SessionData {
      decodedToken: admin.auth.DecodedIdToken | null;
    }
  }
}
