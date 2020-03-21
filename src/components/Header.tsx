import Link from "next/link";
import React from "react";
import { MdAccountCircle } from "react-icons/md";
import styled from "styled-components";

import Color from "../constants/Color";

const Root = styled.header`
  padding: 8px;
  color: ${Color.Text.White};
  font-weight: bold;
  font-size: 2.4rem;
  font-family: "corporate-logo", sans-serif;
  letter-spacing: 3px;
  text-align: center;
  background-color: ${Color.Background.Navy};
`;

const Inner = styled.div`
  position: relative;
  max-width: 960px;
  margin: 0 auto;
`;

const TopLink = styled.a`
  display: inline-block;
`;

const MyPageLink = styled(MdAccountCircle)`
  position: absolute;
  top: 50%;
  right: 0;
  width: 32px;
  height: 32px;
  transform: translate(0, -50%);
`;

const Header = () => (
  <Root>
    <Inner>
      <Link href="/">
        <TopLink>てつどうダイアリー</TopLink>
      </Link>
      <Link href="/mypage">
        <MyPageLink />
      </Link>
    </Inner>
  </Root>
);

export default Header;
