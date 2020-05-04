// reference: https://github.com/abyssparanoia/discuspin-next/blob/7ad90fcab441e7525dc60838b49d0ca9b096673e/src/server.ts

import Express from "express";
import admin from "firebase-admin";

declare global {
  namespace Express {
    interface Request {
      firebaseServer: admin.app.App;
    }
  }
}
