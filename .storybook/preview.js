import { addDecorator, addParameters } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { withInfo } from "@storybook/addon-info";

import { GlobalStyle } from "../src/pages/_app";
import BreakPoint from "../src/constants/BreakPoint";
import Button from "../src/components/Button"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport/dist/defaults";
import styled from "styled-components";

const Container = styled.div`
  max-width: ${BreakPoint.Large}px;
  margin: 0 auto;
`;

addDecorator(withKnobs);
addDecorator(withInfo({
  inline: true
}));
addDecorator(story => <Container><GlobalStyle />{story()}</Container>);
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: "iphonex"
  }
});