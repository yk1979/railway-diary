import { text } from "@storybook/addon-knobs";
import React from "react";

import Button, { buttonTheme } from "..";

export default {
  title: "Button",
};

export const Primary: React.FC = () => {
  const buttonText = text("button text", "Primary");
  return <Button text={buttonText} />;
};
export const Back: React.FC = () => {
  const buttonText = text("button text", "Back");
  return <Button text={buttonText} theme={buttonTheme.back} />;
};
