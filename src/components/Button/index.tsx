import React from "react";
import styled, { ThemeProvider } from "styled-components";

import Color from "../../constants/Color";
import Font from "../../constants/Font";

export const buttonTheme = {
  primary: {
    background: `${Color.Button.Primary}`
  },
  back: {
    background: `${Color.Button.Gray}`
  }
};

export const Base = styled.button`
  width: 100%;
  padding: 0 16px;
  color: ${Color.Text.White};
  font-weight: bold;
  font-size: 1.8rem;
  font-family: ${Font.Family.Primary};
  line-height: 40px;
  background: ${({ theme }) => theme.background};
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

type ButtonBaseProps = {
  text: string;
  theme?: { [key: string]: string };
  // TODO any修正
  onClick?: any;
};

type Props = ButtonBaseProps & {
  className?: string;
};

const Button = ({
  text,
  onClick,
  theme = buttonTheme.primary,
  className
}: Props) => (
  <ThemeProvider theme={theme}>
    <Base className={className} onClick={onClick} theme={theme}>
      {text}
    </Base>
  </ThemeProvider>
);

export default Button;
