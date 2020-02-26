import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Color from "../../constants/Color";

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
  line-height: 40px;
  background: ${({ theme }) => theme.background};
  border: none;
  border-radius: 6px;
`;

type ButtonBaseProps = {
  text: string;
  // TODO any修正
  buttonAction?: any;
  theme: { [key: string]: string };
};

type Props = ButtonBaseProps & {
  className?: string;
};

const ButtonBase = ({
  text,
  buttonAction,
  theme = buttonTheme.primary,
  className
}: Props) => (
  <ThemeProvider theme={theme}>
    <Base className={className} onClick={buttonAction} theme={theme}>
      {text}
    </Base>
  </ThemeProvider>
);

export default ButtonBase;
