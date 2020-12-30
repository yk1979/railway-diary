import React from "react";
import styled from "styled-components";

import BreakPoint from "../constants/BreakPoint";
import { useAuthUser } from "../context/userContext";
import Header from "./Header";
import LoadingIcon from "./Loading";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100vh;
`;

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  width: 100%;

  /* TODO ブレイクポイントとは別で値設定したい */
  max-width: ${BreakPoint.Large}px;
  margin: 0 auto;
  padding: 24px 16px;
`;

const StyledLoadingIcon = styled(LoadingIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children, className }) => {
  const { loadingUser } = useAuthUser();
  return (
    <StyledMain className={className}>
      <Header />
      <Container>{loadingUser ? <StyledLoadingIcon /> : children}</Container>
    </StyledMain>
  );
};

export default Layout;
