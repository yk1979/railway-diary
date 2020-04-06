// eslint-disable-next-line
import { storiesOf } from "@storybook/react";
import React from "react";

import Button, { buttonTheme } from "..";

const stories = storiesOf("Components", module);

stories
  .add("Default", () => <Button text="Primary" />)
  .add("Back", () => <Button text="Back" theme={buttonTheme.back} />);
