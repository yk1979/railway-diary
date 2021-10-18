import { Request, Response } from "@specter/client";
import { Service } from "@specter/specter";

import { getUserFromFirestore } from "../../../lib/firestore";
import { User } from "../../../types";

type RequestHeader = Record<string, string | string[]>;
type RequestBody = Record<string, unknown>;
export type ShowUserServiceQuery = {
  firestore: FirebaseFirestore.Firestore;
  userId: string;
};
type ResponseHeader = Record<string, unknown>;
export type ShowUserServiceBody = User | null;

export default class ShowUserService extends Service {
  constructor(config: Record<string, unknown>) {
    super("show_user", config);
  }

  async read(
    request: Request<RequestHeader, ShowUserServiceQuery, RequestBody>
  ): Promise<Response<ResponseHeader, ShowUserServiceBody>> {
    try {
      const { query } = request;
      // TODO loggerを入れる
      const user = await getUserFromFirestore(query);
      const response = new Response<ResponseHeader, ShowUserServiceBody>(
        {},
        user
      );
      response.setStatus(user ? 200 : 404);
      return response;
    } catch (err) {
      // TODO エラーレスポンス生成関数を作る
      const response = new Response<ResponseHeader, ShowUserServiceBody>(
        {},
        err
      );
      response.setStatus(500);
      return response;
    }
  }
}
