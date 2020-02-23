import React from "react";
import styled from "styled-components";
import Color from "../../constants/Color";

const Button = styled.button`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  color: ${Color.Text.White};
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 40px;
  background-color: ${Color.Primary.Blue};
  border: none;
  border-radius: 6px;
`;

type PrimaryProps = {
  text: string;
};

type Props = PrimaryProps & {
  className?: string;
};

const Primary = ({ text, className }: Props) => (
  <Button type="button" className={className}>
    {text}
  </Button>
);

export default Primary;
