import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Inner } from "../../styles/common";

const StyledHeader = styled.header`
  padding: 12px;
  color: "#fff";
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 1.6;
  background-color: #8aa6a6;
`;

const Header = () => (
  <StyledHeader>
    <Inner>
      <h1>
        <Link href="/">Movie Stocker</Link>
      </h1>
    </Inner>
  </StyledHeader>
);

export default Header;
