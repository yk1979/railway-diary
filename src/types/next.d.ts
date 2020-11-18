import Express from "express";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

type StatusCode = 404 | 500;

type MyNextContext = GetServerSidePropsContext & {
  req?: Express.Request;
  res?: Express.Response;
};

type ErrorProps = {
  statusCode: StatusCode;
};

interface MyGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> extends GetServerSideProps {
  (context: MyNextContext<Q>): Promise<
    GetServerSidePropsResult<P | ErrorProps>
  >;
}
