import { NextPage } from "next";
import { MyNextContext } from "next-redux-wrapper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { RootState, wrapper } from "../store";
import { createDraft } from "../store/diary/actions";
import { Diary } from "../store/diary/types";
import { userSignIn } from "../store/user/actions";
import { User } from "../store/user/types";

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

type EditPageProps = {
  user: User;
};

const EditPage: NextPage<EditPageProps> = ({ user }: EditPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // TODO fix
  const diary = useSelector((state: RootState) => state.diary as Diary);

  const handleSubmit = (diary: Diary) => {
    dispatch(createDraft(diary));
    if (diary.body.length > 0) {
      router.push("/preview");
    }
  };

  return (
    <StyledLayout userId={user ? user.uid : null}>
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      {user && <StyledEditForm diary={diary} handleSubmit={handleSubmit} />}
    </StyledLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  ({ req, store }: MyNextContext) => {
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
  }
);

export default EditPage;
