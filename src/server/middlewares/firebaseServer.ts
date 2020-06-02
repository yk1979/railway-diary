import express from "express";
import admin from "firebase-admin";

const firebaseServer = (firebase: admin.app.App): express.RequestHandler => {
  return (req, _, next) => {
    Object.defineProperty(req, "firebaseServer", {
      value: firebase
    });
    next();
  };
};

export default firebaseServer;
