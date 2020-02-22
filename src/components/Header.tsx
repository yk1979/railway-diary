import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Color from "../constants/Color";

const Root = styled.header`
  padding: 12px;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.6;
  background-color: ${Color.Background.Navy};
`;

const Inner = styled.div`
  width: 580px;
  margin: 0 auto;
`;

const StyledLink = styled.a`
  color: ${Color.Text.White};
  cursor: pointer;
`;

const Header = () => (
  <Root>
    <Inner>
      <Link href="/">
        <StyledLink>Movie Stocker</StyledLink>
      </Link>
    </Inner>
  </Root>
);

export default Header;
