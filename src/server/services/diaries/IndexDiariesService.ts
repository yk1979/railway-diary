import { Request, Response } from "@specter/client";
import { Service } from "@specter/specter";

import { getDiariesFromFirestore } from "../../../lib/firestore";
import { Diary } from "../../../store/diaries/types";

type RequestHeader = Record<string, any>;
type RequestBody = Record<string, any>;
export type IndexDiariesServiceQuery = {
  firestore: FirebaseFirestore.Firestore;
  userId: string;
};
type ResponseHeader = Record<string, any>;
export type IndexDiariesServiceBody = Diary[];

export default class IndexDiariesService extends Service {
  constructor(config: Record<string, unknown>) {
    super("index_diaries", config);
  }

  async read(
    request: Request<RequestHeader, IndexDiariesServiceQuery, RequestBody>
  ): Promise<Response<ResponseHeader, IndexDiariesServiceBody>> {
    try {
      // TODO loggerを入れる
      const q = request.query;
      const params = {
        firestore: q.firestore,
        userId: q.userId,
      };
      const diaries = await getDiariesFromFirestore(params);
      const response = new Response<ResponseHeader, IndexDiariesServiceBody>(
        {},
        diaries
      );
      response.setStatus(200);
      return response;
    } catch (err) {
      // TODO エラーレスポンス生成関数を作る
      const response = new Response<ResponseHeader, IndexDiariesServiceBody>(
        {},
        err
      );
      response.setStatus(500);
      return response;
    }
  }
}
