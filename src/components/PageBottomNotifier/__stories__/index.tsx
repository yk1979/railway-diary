import { text } from "@storybook/addon-knobs";
import React from "react";

import PageBottomNotifier from "..";

export default {
  title: "PageBottomNotifier",
};

export const Default: React.FC = () => {
  const notifierText = text("notifier text", "日記を削除しました");
  return <PageBottomNotifier text={notifierText} status="visible" />;
};
