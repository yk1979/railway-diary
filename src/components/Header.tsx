import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Root = styled.header`
  padding: 12px;
  color: "#fff";
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 1.6;
  background-color: #8aa6a6;
`;

const Inner = styled.div`
  width: 580px;
  margin: 0 auto;
`;

const StyledLink = styled.a`
  color: #fff;
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
