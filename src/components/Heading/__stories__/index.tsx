import { text } from "@storybook/addon-knobs";
import React from "react";

import Heading from "..";

export default {
  title: "Heading",
};

export const Text1: React.FC = () => {
  const headingText = text("heading text", "Heading1 / みだし1 / 見出し1");
  return <Heading.Text1 text={headingText} />;
};
