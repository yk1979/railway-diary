// const express = require("express");
// const next = require("next");
import express from "express";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/healtz", (_, res) => {
    res.send("OK");
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
