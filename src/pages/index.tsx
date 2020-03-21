import React from "react";
import styled from "styled-components";

import EditButton from "../components/EditButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";

const StyledLayout = styled(Layout)`
  > div {
    position: relative;
  }
`;

const StyledEditButton = styled(EditButton)`
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

const IndexPage = () => (
  <StyledLayout>
    <SearchBox />
    <StyledEditButton />
  </StyledLayout>
);

export default IndexPage;
