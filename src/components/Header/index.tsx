import Link from "next/link";
import React from "react";
import { MdAccountCircle } from "react-icons/md";
import styled from "styled-components";

import BreakPoint from "../../constants/BreakPoint";
import Color from "../../constants/Color";

const Root = styled.header`
  padding: 8px;
  font-weight: bold;
  font-size: 2.4rem;
  font-family: "corporate-logo", sans-serif;
  letter-spacing: 3px;
  text-align: center;
  background-color: ${Color.Background.Navy};
`;

const Inner = styled.div`
  position: relative;
  max-width: ${BreakPoint.Large}px;
  margin: 0 auto;
`;

const TopLink = styled.a`
  display: inline-block;
  color: ${Color.Text.White};
`;

const MyPageLink = styled.a`
  position: absolute;
  top: 50%;
  right: 0;
  width: 32px;
  height: 32px;
  transform: translate(0, -50%);
  > svg {
    width: 100%;
    height: 100%;
    color: ${Color.Text.White};
  }
`;

type HeaderProps = {
  userId: string | null;
};

const Header: React.FC<HeaderProps> = ({ userId }) => (
  <Root>
    <Inner>
      <TopLink href="/">てつどうダイアリー</TopLink>
      {userId && (
        <Link href={`/user/${userId}`}>
          <MyPageLink>
            <MdAccountCircle />
          </MyPageLink>
        </Link>
      )}
    </Inner>
  </Root>
);

export default Header;
