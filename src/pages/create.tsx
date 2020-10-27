import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { Diary } from "../server/services/diaries/types";
import { wrapper } from "../store";
import { createDraft } from "../store/diaries/reducers";
import { userSignIn } from "../store/user/reducers";
import { User } from "../store/user/reducers";

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

export const getServerSideProps = wrapper.getServerSideProps<{
  props: CreatePageProps;
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

export default CreatePage;
