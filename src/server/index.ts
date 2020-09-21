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

  // TODO すべてのページで未ログイン状態ならloginページにリダイレクトさせて、ログイン後は元のリクエストページに戻したい
  // /\/(?!login)/ でログインページ以外のパスに引っ掛けようとしたけど、パスが"/login"の時も引っかかっちゃってうまくいかず
  server.get(
    ["/", "/create", "/preview", "/user/:userId"],
    (req, res, next) => {
      if (req?.session?.decodedToken) {
        next();
      } else {
        res.redirect("/login");
      }
    }
  );

  server.post("/api/login", async (req, res) => {
    if (!req.body) res.sendStatus(400);

    const { token } = req.body;
    try {
      const decodedToken = await firebase.auth().verifyIdToken(token);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      req.session!.decodedToken = decodedToken;
      res.json({ status: true, decodedToken });
    } catch (error) {
      res.json({ error });
    }
  });

  server.post("/api/logout", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    req.session!.decodedToken = null;
    res.json({ status: true });
  });

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err: Error) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
})();
