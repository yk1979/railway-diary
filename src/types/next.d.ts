// 実践TypeScript 10-3-5参照
import Express from "express";
import { NextPageContext } from "next";

declare module "next" {
  type MyNextContext = NextPageContext & {
    req?: Express.Request;
    res?: Express.Response;
  };
}
