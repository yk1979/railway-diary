import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 16px 0;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => (
  <main>
    <Header />
    <Container>{children}</Container>
  </main>
);

export default Layout;
