import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import EditForm from "../../../../../components/EditForm";
import Heading from "../../../../../components/Heading";
import Layout from "../../../../../components/Layout";
import { specterRead } from "../../../../../lib/client";
import {
  ShowDiaryServiceBody,
  ShowDiaryServiceQuery,
} from "../../../../../server/services/diaries/ShowDiaryService";
import { wrapper } from "../../../../../store";
import { createDraft, getDiary } from "../../../../../store/diaries/reducers";
import { Diary } from "../../../../../store/diaries/reducers";
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
}>(async ({ req, res, query, store }) => {
  const { userId, diaryId } = query as { userId: string; diaryId: string };
  const token = req?.session?.decodedToken;

  if (!token) {
    res.redirect("/login");
  }

  store.dispatch(
    userSignIn({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,
      uid: token!.uid,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,
      name: token!.name,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,
      picture: token!.picture,
    })
  );
  const firestore = req.firebaseServer.firestore();
  const params = {
    firestore,
    userId,
    diaryId,
  };
  store.dispatch(getDiary.started(params));
  const diary = await specterRead<
    Record<string, unknown>,
    ShowDiaryServiceQuery,
    ShowDiaryServiceBody
  >({
    serviceName: "show_diary",
    query: params,
  });
  store.dispatch(getDiary.done({ params, result: diary.body }));
  const { user } = store.getState();

  return {
    props: {
      user,
      diary: diary.body,
    },
  };
});

export default DiaryEditPage;
