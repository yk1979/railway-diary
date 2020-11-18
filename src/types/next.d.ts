import Express from "express";
import { GetServerSidePropsContext } from "next";

type StatusCode = 404 | 500;

type MyNextContext = GetServerSidePropsContext & {
  req?: Express.Request;
  res?: Express.Response;
};

type ErrorProps = {
  statusCode: StatusCode;
};

type MyGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: MyNextContext<Q>
) => Promise<GetServerSidePropsResult<P | ErrorProps>>;
