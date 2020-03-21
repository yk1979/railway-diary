import React from "react";
import styled from "styled-components";

import Header from "./Header";

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Container = styled.div`
  flex-grow: 1;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
`;

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Layout = ({ children, className }: Props) => (
  <StyledMain className={className}>
    <Header />
    <Container>{children}</Container>
  </StyledMain>
);

export default Layout;
