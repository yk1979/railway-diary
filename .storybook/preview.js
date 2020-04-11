import { addDecorator } from "@storybook/react";

import { GlobalStyle } from "../src/pages/_app";

addDecorator(style => <><GlobalStyle />{style()}</>)