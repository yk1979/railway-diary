import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

import EditButton from "../components/EditButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import { wrapper } from "../store";
import { userSignIn } from "../store/user/reducers";
import { User } from "../store/user/reducers";

const StyledEditButton = styled(EditButton)`
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

type IndexPageProps = {
  user: User;
};

const IndexPage: NextPage<IndexPageProps> = ({ user }) => {
  return (
    <Layout userId={user ? user.uid : null}>
      <SearchBox />
      <StyledEditButton />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<{
  props: IndexPageProps;
}>(({ req, store }) => {
  const token = req?.session?.decodedToken;

  if (token) {
    store.dispatch(
      userSignIn({
        uid: token.uid,
        name: token.name,
        picture: token.picture,
      })
    );
  }
  const { user } = store.getState();

  return {
    props: {
      user,
    },
  };
});

export default IndexPage;
