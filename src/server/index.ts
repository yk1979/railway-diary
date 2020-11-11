import Specter from "@specter/specter";
import express from "express";
import session from "express-session";
import * as admin from "firebase-admin";
import next from "next";
import getConfig from "next/config";

import firebaseServer from "./middlewares/firebaseServer";
import * as Services from "./services/";

const port = parseInt(process.env.PORT || "4000", 10);
const dev = process.env.NODE_ENV !== "production";

(async () => {
  const server = express();
  const app = next({ dev });
  const handle = app.getRequestHandler();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const FileStore = require("session-file-store")(session);

  const firebase = admin.initializeApp(
    {
      credential: admin.credential.applicationDefault(),
      databaseURL: "https://railway-diary.firebaseio.com",
    },
    "server"
  );

  await app.prepare();
  const config = getConfig();
  Object.values(Services).forEach((Service) => {
    Specter.registerService(new Service(config));
  });
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use("/xhr", Specter.createMiddleware({}));

  // next.jsのヘルスチェック
  server.get("/healthz", (_, res) => {
    res.send("OK");
  });

  server.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      rolling: true,
      store: new FileStore({ secret: "keyboard cat" }),
      cookie: { maxAge: 604800000, httpOnly: true },
    })
  );

  server.use(firebaseServer(firebase));

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
