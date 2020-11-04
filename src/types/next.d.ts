import Express from "express";
import { GetServerSidePropsContext } from "next";

type MyNextContext = GetServerSidePropsContext & {
  req?: Express.Request;
  res?: Express.Response;
};
