// 実践TypeScript 10-3-5参照
import Express from "express";
import { NextPageContext } from "next";
import { MakeStore } from "next-redux-wrapper";

declare module "next" {
  type MyNextContext = NextPageContext & {
    req?: Express.Request;
    res?: Express.Response;
    store: ReturnType<MakeStore>;
  };
}
