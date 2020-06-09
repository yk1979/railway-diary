import React from "react";
import styled from "styled-components";

import Font from "../../constants/Font";
import { HeadingProps } from ".";

const Root = styled.h1`
  font-size: 2.4rem;
  font-family: ${Font.Family.Primary};
`;

const Text1: React.FC<HeadingProps> = ({ text, as = "h1" }) => (
  <Root as={as}>{text}</Root>
);

export default Text1;
