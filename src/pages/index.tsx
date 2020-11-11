import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import EditButton from "../components/EditButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import { useUser } from "../context/userContext";

const StyledEditButton = styled(EditButton)`
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

const IndexPage: NextPage = () => {
  const { user } = useUser();
  if (!user) {
    return (
      <Layout userId={null}>
        <Link href="/login">
          <a>ログインしてね</a>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout userId={user ? user.uid : null}>
      <SearchBox />
      <StyledEditButton />
    </Layout>
  );
};

export default IndexPage;
