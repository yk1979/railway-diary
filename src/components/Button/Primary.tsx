import React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";

const Button = styled.button`
  width: 100%;
  padding: 0 16px;
  color: ${Color.Text.White};
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 40px;
  background-color: ${Color.Button.Primary};
  border: none;
  border-radius: 6px;
`;

type PrimaryProps = {
  text: string;
  buttonAction?: any;
};

type Props = PrimaryProps & {
  className?: string;
};

const Primary = ({ text, className, buttonAction }: Props) => (
  <Button type="button" className={className} onClick={buttonAction}>
    {text}
  </Button>
);

export default Primary;
