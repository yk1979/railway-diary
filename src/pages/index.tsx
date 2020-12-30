import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

import EditButton from "../components/EditButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";

const StyledEditButton = styled(EditButton)`
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

const IndexPage: NextPage = () => (
  <Layout>
    <SearchBox />
    <StyledEditButton />
  </Layout>
);

export default IndexPage;
