import { GetServerSidePropsResult, NextPage } from "next";
import React from "react";
import styled from "styled-components";

import EditButton from "../components/EditButton";
import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import { initializeStore } from "../store";
import { User, userSignIn } from "../store/user/reducers";
import { MyNextContext } from "../types/next";

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

export const getServerSideProps = ({
  req,
  res,
}: // TODO return 型再考
MyNextContext): GetServerSidePropsResult<IndexPageProps> | undefined => {
  const store = initializeStore();
  const token = req?.session?.decodedToken;

  if (!token) {
    res.redirect("/login");
    return;
  } else {
    store.dispatch(
      userSignIn({
        uid: token.uid,
        name: token.name,
        picture: token.picture,
      })
    );
    // TODO 色々微妙だけど応急処置 ログイン処理をappに寄せたい
    const { user } = store.getState() as { user: User };

    return {
      props: {
        user,
      },
    };
  }
};

export default IndexPage;
