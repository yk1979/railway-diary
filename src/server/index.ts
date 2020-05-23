import express from "express";
import session from "express-session";
import * as admin from "firebase-admin";
import Next from "next";

import firebaseServer from "./middlewares/firebaseServer";

const FileStore = require("session-file-store")(session);

const port = parseInt(process.env.PORT || "4000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = Next({ dev });

const handle = app.getRequestHandler();

const firebase = admin.initializeApp(
  {
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://railway-diary.firebaseio.com"
  },
  "server"
);

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

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
      cookie: { maxAge: 604800000, httpOnly: true }
    })
  );

  server.use(firebaseServer(firebase));

  // TODO すべてのページで未ログイン状態ならloginページにリダイレクトさせて、ログイン後は元のリクエストページに戻したい
  // /\/(?!login)/ でログインページ以外のパスに引っ掛けようとしたけど、パスが"/login"の時も引っかかっちゃってうまくいかず
  server.get(["/", "/edit", "/preview", "/user/:userId"], (req, res, next) => {
    if (req?.session?.decodedToken) {
      next();
    } else {
      res.redirect("/login");
    }
  });

  server.post("/api/login", async (req, res) => {
    if (!req.body) res.sendStatus(400);

    const { token } = req.body;
    try {
      const decodedToken = await firebase.auth().verifyIdToken(token);
      req.session!.decodedToken = decodedToken;
      res.json({ status: true, decodedToken });
    } catch (error) {
      res.json({ error });
    }
  });

  server.post("/api/logout", (req, res) => {
    req.session!.decodedToken = null;
    res.json({ status: true });
  });

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err: Error) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
