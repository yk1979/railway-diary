import { GetServerSidePropsResult, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import EditForm from "../../../../../components/EditForm";
import Heading from "../../../../../components/Heading";
import Layout from "../../../../../components/Layout";
import { useAuthUser } from "../../../../../context/userContext";
import { specterRead } from "../../../../../lib/client";
import { createDraft, getDiary } from "../../../../../redux/modules/diaries";
import { RootState, initializeStore } from "../../../../../redux/store";
import {
  ShowDiaryServiceBody,
  ShowDiaryServiceQuery,
} from "../../../../../server/services/diaries/ShowDiaryService";
import { Diary } from "../../../../../server/services/diaries/types";
import { MyNextContext } from "../../../../../types/next";

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
  diary: Diary;
};

// TODO store と サーバから渡される値を二重で取得してるのがダサすぎるので直したい
const DiaryEditPage: NextPage<DiaryEditPageProps> = ({ diary }) => {
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

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (diary: Diary) => {
    dispatch(createDraft(diary));
    if (diary.body.length > 0) {
      router.push("/preview");
    }
  };

  const _diary = useSelector((state: RootState) => state.diaries[0]) || diary;

  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      {user && (
        <StyledEditForm
          diary={_diary}
          handleSubmit={(_diary) => handleSubmit(_diary)}
        />
      )}
    </StyledLayout>
  );
};

export const getServerSideProps = async ({
  req,
  query,
}: MyNextContext): Promise<GetServerSidePropsResult<DiaryEditPageProps>> => {
  const store = initializeStore();
  const { userId, diaryId } = query as { userId: string; diaryId: string };

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

  return {
    props: {
      diary: diary.body,
    },
  };
};

export default DiaryEditPage;
