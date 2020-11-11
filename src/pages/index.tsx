import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import EditButton from "../components/EditButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import { useAuthUser } from "../context/userContext";

const StyledEditButton = styled(EditButton)`
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

const IndexPage: NextPage = () => {
  const { authUser: user } = useAuthUser();
  if (!user) {
    return (
      <Layout>
        <Link href="/login">
          <a>ログインしてね</a>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <SearchBox />
      <StyledEditButton />
    </Layout>
  );
};

export default IndexPage;
