import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Color from "../constants/Color";

const Root = styled.header`
  padding: 8px;
  font-weight: bold;
  font-size: 2.4rem;
  text-align: center;
  background-color: ${Color.Background.Navy};
`;

const Inner = styled.div`
  max-width: 960px;
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
        <StyledLink>てつどうダイアリー</StyledLink>
      </Link>
    </Inner>
  </Root>
);

export default Header;
