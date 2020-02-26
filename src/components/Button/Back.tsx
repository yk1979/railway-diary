import React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";

// TODO theme provider使えそう
const Button = styled.button`
  display: block;
  height: 40px;
  padding: 0 16px;
  color: ${Color.Text.White};
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 40px;
  text-align: center;
  background-color: ${Color.Button.Gray};
  border: none;
  border-radius: 6px;
`;

type BackProps = {
  text: string;
  buttonAction?: any;
};

type Props = BackProps & {
  className?: string;
};

const Back = ({ text, className, buttonAction }: Props) => (
  <Button className={className} onClick={buttonAction}>
    {text}
  </Button>
);

export default Back;
