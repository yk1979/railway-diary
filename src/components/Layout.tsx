import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Container = styled.div`
  max-width: 580px;
  margin: 0 auto;
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
