import React from "react";
import styled from "styled-components";

import AddButton from "../components/AddButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
// import NavButton from "../components/NavButton";

const StyledLayout = styled(Layout)`
  position: relative;
`;

const StyledAddButton = styled(AddButton)`
  position: fixed;
  right: 16px;
  bottom: 20px;
`;

const Index = () => (
  <StyledLayout>
    {/* <NavButton link="/favorite" text="favorite" />
    <NavButton link="/watched" text="watched" /> */}
    <SearchBox />
    <StyledAddButton />
  </StyledLayout>
);

export default Index;
