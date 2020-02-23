import React from "react";
import styled from "styled-components";
import { MdModeEdit } from "react-icons/md";
import Color from "../constants/Color";

const Root = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  color: ${Color.Text.White};
  font-size: 3.2rem;
  background: ${Color.Primary.Blue};
  border-radius: 50%;
`;

type Props = {
  className?: string;
};

const AddButton = ({ className }: Props) => (
  <Root href="/edit" className={className}>
    <MdModeEdit />
  </Root>
);

export default AddButton;
