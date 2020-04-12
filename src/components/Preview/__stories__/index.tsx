// eslint-disable-next-line import/no-extraneous-dependencies
import { text } from "@storybook/addon-knobs";
import React from "react";

import Preview from "..";

export default {
  title: "Preview"
};

export const Default = () => {
  const title = text("title", "指宿枕崎線");
  const body = text(
    "body",
    "鹿児島中央駅から枕崎駅まで87.8キロメートルを結ぶ指宿枕崎線。錦江湾に沿って薩摩半島の海岸線を進むルートで、車窓には風光明媚な景色が続く。なかでも“薩摩富士”と称される開聞岳や錦江湾が織りなす絶景は、思わず息をのむほどの美しさ。"
  );
  return (
    <Preview
      diary={{ id: 1, title, body }}
      onSave={async () => {}}
      onBack={() => {}}
    />
  );
};
export const NoDraft = () => (
  <Preview diary={null} onSave={async () => {}} onBack={() => {}} />
);
