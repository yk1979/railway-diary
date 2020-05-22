// 実践TypeScript 10-3-5参照
import Express from "express";
import { GetServerSidePropsContext } from "next-redux-wrapper";

declare module "next/dist/next-server/lib/utils" {
  type MyNextContext = GetServerSidePropsContext & {
    req?: Express.Request;
    res?: Express.Response;
    store: Store<RootState, AnyAction>;
  };
}
