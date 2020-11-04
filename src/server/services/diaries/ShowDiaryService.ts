import { Request, Response } from "@specter/client";
import { Service } from "@specter/specter";

import { getDiaryFromFirestore } from "../../../lib/firestore";
import { Diary } from "./types";

type RequestHeader = Record<string, string | string[]>;
type RequestBody = Record<string, unknown>;
export type ShowDiaryServiceQuery = {
  firestore: FirebaseFirestore.Firestore;
  userId: string;
  diaryId: string;
};
type ResponseHeader = Record<string, unknown>;
export type ShowDiaryServiceBody = Diary;

export default class ShowDiaryService extends Service {
  constructor(config: Record<string, unknown>) {
    super("show_diary", config);
  }

  async read(
    request: Request<RequestHeader, ShowDiaryServiceQuery, RequestBody>
  ): Promise<Response<ResponseHeader, ShowDiaryServiceBody>> {
    try {
      // TODO loggerを入れる
      const diary = await getDiaryFromFirestore(request.query);
      const response = new Response<ResponseHeader, ShowDiaryServiceBody>(
        {},
        diary
      );
      response.setStatus(200);
      return response;
    } catch (err) {
      // TODO エラーレスポンス生成関数を作る
      const response = new Response<ResponseHeader, ShowDiaryServiceBody>(
        {},
        err
      );
      response.setStatus(500);
      return response;
    }
  }
}
