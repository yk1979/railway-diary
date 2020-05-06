import { MyNextContext, NextPage } from "next";
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

type IndexPageProps = {
  userId: string | null;
};

const IndexPage: NextPage<IndexPageProps> = ({ userId }: IndexPageProps) => (
  <Layout userId={userId}>
    <SearchBox />
    <StyledEditButton />
  </Layout>
);

IndexPage.getInitialProps = async ({ req }: MyNextContext) => {
  const token = req?.session?.decodedToken;

  const userId = token?.uid || null;

  return {
    userId
  };
};

export default IndexPage;
