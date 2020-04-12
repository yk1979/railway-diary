// eslint-disable-next-line import/no-extraneous-dependencies
import { text } from "@storybook/addon-knobs";
import React from "react";

import Button, { buttonTheme } from "..";

export default {
  title: "Button"
};

export const Primary = () => {
  const buttonText = text("button text", "Primary");
  return <Button text={buttonText} />;
};
export const Back = () => {
  const buttonText = text("button text", "Back");
  return <Button text={buttonText} theme={buttonTheme.back} />;
};
