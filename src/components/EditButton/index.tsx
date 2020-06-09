import React from "react";
import { MdModeEdit } from "react-icons/md";
import styled from "styled-components";

import Color from "../../constants/Color";

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

const EditButton: React.FC<Props> = ({ className }) => (
  <Root className={className} href="/edit">
    <MdModeEdit />
  </Root>
);

export default EditButton;
