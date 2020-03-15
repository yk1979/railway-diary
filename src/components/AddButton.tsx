import Link from "next/link";
import React from "react";
import { MdModeEdit } from "react-icons/md";
import styled from "styled-components";

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
  <Link href="/edit">
    <Root className={className}>
      <MdModeEdit />
    </Root>
  </Link>
);

export default AddButton;
