import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import EditButton from "../components/EditButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import { RootState, wrapper } from "../store";
import { userSignIn } from "../store/user/actions";

const StyledEditButton = styled(EditButton)`
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

const IndexPage: NextPage = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Layout userId={user ? user.uid : null}>
      <SearchBox />
      <StyledEditButton />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  // TODO any修正
  ({ req, store }: any) => {
    const token = req?.session?.decodedToken;

    if (token) {
      store.dispatch(
        userSignIn({
          uid: token.uid,
          name: token.name,
          picture: token.picture
        })
      );
    }
  }
);

export default IndexPage;
