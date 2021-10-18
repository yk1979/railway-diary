import React from "react";
import styled from "styled-components";

import BreakPoint from "../constants/BreakPoint";
import Header from "./Header";

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
  max-width: ${BreakPoint.Large}px;
  margin: 0 auto;
  padding: 24px 16px;
`;

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children, className }) => {
  return (
    <StyledMain className={className}>
      <Header />
      <Container>{children}</Container>
    </StyledMain>
  );
};

export default Layout;
