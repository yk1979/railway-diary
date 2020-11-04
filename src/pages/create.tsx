import { GetServerSidePropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { createDraft } from "../redux/modules/diaries";
import { userSignIn } from "../redux/modules/user";
import { User } from "../redux/modules/user";
import { initializeStore } from "../redux/store";
import { Diary } from "../server/services/diaries/types";
import { MyNextContext } from "../types/next";

const StyledLayout = styled(Layout)`
  > div {
    display: flex;
    flex-direction: column;
  }
`;

const StyledEditForm = styled(EditForm)`
  flex: 1;
  margin-top: 24px;
`;

type CreatePageProps = {
  user: User;
};

const CreatePage: NextPage<CreatePageProps> = ({ user }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (diary: Diary) => {
    dispatch(createDraft(diary));
    if (diary.body.length > 0) {
      router.push("/preview");
    }
  };

  return (
    <StyledLayout userId={user ? user.uid : null}>
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      {user && <StyledEditForm handleSubmit={handleSubmit} />}
    </StyledLayout>
  );
};

export const getServerSideProps = ({
  req,
  res,
}: MyNextContext): GetServerSidePropsResult<CreatePageProps> | undefined => {
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

export default CreatePage;
