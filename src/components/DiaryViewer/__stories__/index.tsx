// eslint-disable-next-line import/no-extraneous-dependencies
import { text } from "@storybook/addon-knobs";
import React from "react";

import DiaryViewer from "..";
import { Diary } from "../../../server/types";

export default {
  title: "DiaryViewer"
};

const diary: Diary = {
  id: "1",
  title: text("title", "指宿枕崎線"),
  body: text(
    "body",
    "鹿児島中央駅から枕崎駅まで87.8キロメートルを結ぶ指宿枕崎線。錦江湾に沿って薩摩半島の海岸線を進むルートで、車窓には風光明媚な景色が続く。なかでも“薩摩富士”と称される開聞岳や錦江湾が織りなす絶景は、思わず息をのむほどの美しさ。"
  ),
  lastEdited: "2020-05-21 13:04"
};

export const Default = () => {
  return <DiaryViewer diary={diary} />;
};

export const WithButtons = () => (
  <DiaryViewer
    diary={diary}
    buttons={{
      onSave: async () => {},
      onBack: () => {}
    }}
  />
);

export const WithControllers = () => (
  <DiaryViewer
    diary={diary}
    controller={{
      onEdit: () => {},
      onDelete: () => {}
    }}
  />
);
