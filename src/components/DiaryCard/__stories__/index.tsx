// eslint-disable-next-line import/no-extraneous-dependencies
import { text } from "@storybook/addon-knobs";
import React from "react";

import { Diary } from "../../../store/diary/types";
import DiaryItem from "..";

const diary: Diary = {
  id: "1",
  title: text("title", "JR只見線"),
  body: text(
    "body",
    "新潟県魚沼市の小出駅から福島県会津若松市の会津若松駅を結ぶ路線全長約135kmの路線です。\n\n絶景の秘境路線であり、車窓からは魚沼の特産コシヒカリの田園風景や、民話「弥三郎ばさ」で知られる権現堂山、破間川の渓谷を楽しむことができます。特に秋の色鮮やかな紅葉と渓谷のコラボレーション、水墨画のような雪景色は必見です。只見線は車窓からの景色だけでなく、その絶景と只見線を一緒に望むことが出来ます。絶景を撮影しようと全国各地から多くのカメラマンが訪れます。\n\n新緑と残雪、山桜のコントラストが美しい春、青々とした山の木々と真っ赤なスノーシェッドが美しい夏、末沢川の渓谷美とブナ林の紅葉が楽しめる秋、そして日本有数の豪雪地である魚沼の雪の中力強く只見線が走る冬。一度ではなく何度でも乗りたくなる、そんな四季折々その時にしか味わえない絶景が魅力です。"
  ),
  lastEdited: text("lastEdited", "2020-05-12 21:12"),
};

export default {
  title: "DiaryItem",
};

// TODO delete action追加
export const Default = () => {
  const body = text(
    "body",
    "新潟県魚沼市の小出駅から福島県会津若松市の会津若松駅を結ぶ路線全長約135kmの路線です。"
  );
  return (
    <DiaryItem
      diary={{ ...diary, body }}
      url=""
      controller={{
        onEdit: () => {},
        onDelete: () => {},
      }}
    />
  );
};

export const ClampedBody = () => (
  <DiaryItem
    diary={diary}
    url=""
    controller={{
      onEdit: () => {},
      onDelete: () => {},
    }}
  />
);

export const Uncontrollable = () => <DiaryItem diary={diary} url="" />;
