import { Request, Response } from "@specter/client";
import { Service } from "@specter/specter";

import { getDiaryFromFirestore } from "../../../lib/firestore";
import { Diary } from "../../../store/diaries/reducers";

type RequestHeader = Record<string, any>;
type RequestBody = Record<string, any>;
export type ShowDiaryServiceQuery = {
  firestore: FirebaseFirestore.Firestore;
  userId: string;
  diaryId: string;
};
type ResponseHeader = Record<string, any>;
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
      if (!diary) {
        // TODO エラーレスポンス生成関数を作る
        // TODO firebaseのエラー型を確認する
        const response = new Response<ResponseHeader, any>({}, diary);
        response.setStatus(404);
        return response;
      }

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
