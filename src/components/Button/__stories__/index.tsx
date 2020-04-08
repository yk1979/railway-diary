// eslint-disable-next-line
import React from "react";

import Button, { buttonTheme } from "..";

export default {
  title: "Button"
};

export const Primary = () => <Button text="Primary" />;
export const Back = () => <Button text="Back" theme={buttonTheme.back} />;
