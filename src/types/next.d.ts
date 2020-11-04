import Express from "express";
import { GetServerSidePropsContext } from "next-redux-wrapper";

import { SagaStore } from "../store";

declare module "next-redux-wrapper" {
  type MyNextContext = GetServerSidePropsContext & {
    req?: Express.Request;
    res?: Express.Response;
    store: SagaStore;
  };
}
