import { addDecorator } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import { GlobalStyle } from "../src/pages/_app";

addDecorator(story => <><GlobalStyle />{story()}</>)
addDecorator(withKnobs)