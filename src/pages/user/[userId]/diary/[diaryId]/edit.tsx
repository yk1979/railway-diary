import { NextPage } from "next";
import { MyNextContext } from "next-redux-wrapper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";

import EditForm from "../../../../../components/EditForm";
import Heading from "../../../../../components/Heading";
import Layout from "../../../../../components/Layout";
import { wrapper } from "../../../../../store";
import { createDraft, getDiary } from "../../../../../store/diary/actions";
import { Diary } from "../../../../../store/diary/types";
import { userSignIn } from "../../../../../store/user/actions";
import { User } from "../../../../../store/user/types";

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

type DiaryEditPageProps = {
  user: User;
  diary: Diary;
};

const DiaryEditPage: NextPage<DiaryEditPageProps> = ({ user, diary }) => {
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
      {user && <StyledEditForm diary={diary} handleSubmit={handleSubmit} />}
    </StyledLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<{
  props: DiaryEditPageProps;
}>(async ({ req, query, store }) => {
  const { userId, diaryId } = query as { userId: string; diaryId: string };
  const token = req?.session?.decodedToken;

  if (token) {
    store.dispatch(
      userSignIn({
        uid: token.uid,
        name: token.name,
        picture: token.picture,
      })
    );
    try {
      const firestore = req.firebaseServer.firestore();
      store.dispatch(
        getDiary({
          firestore,
          userId,
          diaryId,
        })
      );
      // TODO このコードなんだっけ
      store.dispatch(END);
      await store.sagaTask?.toPromise();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
  const { user, diary } = store.getState();

  return {
    props: {
      user,
      diary,
    },
  };
});

export default DiaryEditPage;
