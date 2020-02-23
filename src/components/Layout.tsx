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
  padding: 32px 16px 0;
`;

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <StyledMain>
    <Header />
    <Container>{children}</Container>
  </StyledMain>
);

export default Layout;
