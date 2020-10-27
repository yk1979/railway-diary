import { APIDef, GET, ResponseDef, Success200 } from "@agreed/typed";

import { Diary } from "../../../src/server/services/diaries/types";

type Api = APIDef<
  GET, // HTTP method
  ["diaries"], // path
  Record<string, unknown>, // request header
  Record<string, unknown>, // request query
  undefined, // response body
  Record<string, unknown>, // response header
  ResponseDef<
    Success200,
    {
      // TODO lastEditedはtimestamp型で定義する
      diaries: Diary[];
    }
  >
>;

export const api: Api = {
  request: {
    path: ["diaries"],
    method: "GET",
    body: undefined,
  },
  response: {
    status: 200,
    body: {
      diaries: [
        {
          id: "1588745718426",
          title: "遠州鉄道",
          body:
            "通称あかでん。赤い電車と言えばくるりでおなじみの京急線だけど、関西人にとっては近鉄、名古屋人にとっては名鉄、そして浜松あたりの人にとってはこの遠州鉄道なわけですね。あれ、でもよく考えたらくるりって関西のバンドじゃん。近鉄じゃないんか〜い。",
          imageUrls: [],
          lastEdited: "2020-09-21T09:37:45.368Z",
        },
        {
          id: "1588745718427",
          title: "天龍浜名湖鉄道",
          body: "名前がマジでイケてる。",
          imageUrls: [
            "https://firebasestorage.googleapis.com/v0/b/railway-diary.appspot.com/o/dr2gvaMnQnXDpOd0m2VqmmxlVrC3%2F1595692640173%2F19e150e2-0fb9-41d2-af4f-1442a6faee70?alt=media&token=9f1a310d-5000-4da4-a45d-ed1622c7dfb6",
            "https://firebasestorage.googleapis.com/v0/b/railway-diary.appspot.com/o/dr2gvaMnQnXDpOd0m2VqmmxlVrC3%2F1595692640173%2F243deec1-50a3-46b8-ab4e-385603cf9a30?alt=media&token=1bc819cf-bb22-4a4d-bb7f-664290244c70",
          ],
          lastEdited: "2020-07-21T09:37:45.368Z",
        },
      ],
    },
  },
};
