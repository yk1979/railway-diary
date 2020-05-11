import { MyNextContext, NextPage } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import EditButton from "../components/EditButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import { RootState } from "../store";
import { userSignIn } from "../store/user/actions";
import { UserState } from "../store/user/types";

const StyledEditButton = styled(EditButton)`
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

type IndexPageProps = {
  userData: UserState;
};

const IndexPage: NextPage<IndexPageProps> = ({ userData }: IndexPageProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData) {
      dispatch(userSignIn(userData));
    }
  }, []);

  const user = useSelector((state: RootState) => state.user) || userData;

  return (
    <Layout userId={user ? user.uid : null}>
      <SearchBox />
      <StyledEditButton />
    </Layout>
  );
};

IndexPage.getInitialProps = async ({ req }: MyNextContext) => {
  const token = req?.session?.decodedToken;

  const userData: UserState = token
    ? {
        uid: token.uid,
        name: token.name,
        picture: token.picture
      }
    : null;

  return {
    userData
  };
};

export default IndexPage;
