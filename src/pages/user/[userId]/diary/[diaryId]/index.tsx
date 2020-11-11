import { format } from "date-fns-tz";
import parseISO from "date-fns/parseISO";
import { GetServerSidePropsResult, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { firestore } from "../../../../../../firebase";
import DiaryViewer from "../../../../../components/DiaryViewer";
import Layout from "../../../../../components/Layout";
import Modal from "../../../../../components/Modal";
import PageBottomNotifier, {
  NotifierStatus,
} from "../../../../../components/PageBottomNotifier/PageBottomNotifier";
import UserProfile from "../../../../../components/UserProfile";
import { useUser } from "../../../../../context/userContext";
import { specterRead } from "../../../../../lib/client";
import { getUserFromFirestore } from "../../../../../lib/firestore";
import {
  deleteDiary,
  getDiary,
  setDiary,
} from "../../../../../redux/modules/diaries";
import { initializeStore } from "../../../../../redux/store";
import {
  ShowDiaryServiceBody,
  ShowDiaryServiceQuery,
} from "../../../../../server/services/diaries/ShowDiaryService";
import { Diary } from "../../../../../server/services/diaries/types";
import { MyNextContext } from "../../../../../types/next";

const StyledDiaryViewer = styled(DiaryViewer)`
  margin-top: 24px;
`;

type UserDiaryPageProps = {
  author: {
    uid: string;
    name: string | null;
    picture?: string;
  };
  diary: Diary;
};

// TODO ブラウザバックでauthorのデータがうまく取れない問題を修正
const UserDiaryPage: NextPage<UserDiaryPageProps> = ({ author, diary }) => {
  const { user } = useUser();
  if (!user) {
    return (
      <Layout userId={null}>
        <Link href="/login">
          <a>ログインしてね</a>
        </Link>
      </Layout>
    );
  }

  const router = useRouter();
  const dispatch = useDispatch();

  // クライアント側で store に値が入ってないと edit ページに遷移した時にうまくいかないので苦肉の策でこうした
  // しかしここでわざわざこんなアクションを dispatch するの微妙すぎるのでどうにかしたい
  // サーバの store をマージしようとした時に初期値で上書きしようとしてるのが敗因
  dispatch(setDiary(diary));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifierStatus, setNotifierStatus] = useState("hidden");

  const handleEditDiary = () => {
    router.push(`/user/${user.uid}/diary/${diary.id}/edit`);
  };

  const handleAfterModalClose = async () => {
    setNotifierStatus("visible" as NotifierStatus);
    await new Promise((resolve) => {
      setTimeout(() => {
        setNotifierStatus("hidden" as NotifierStatus);
        resolve();
      }, 1000);
    });
    router.push(`/user/${user.uid}`);
  };

  return (
    <Layout userId={user ? user.uid : null}>
      <UserProfile
        user={{
          uid: author.uid,
          name: author.name || "unknown",
        }}
        thumbnail={author.picture}
        info={{
          text: format(parseISO(diary.lastEdited), "yyyy-MM-dd HH:mm", {
            timeZone: "Asia/Tokyo",
          }),
          date: diary.lastEdited,
        }}
      />
      <StyledDiaryViewer
        diary={diary}
        controller={
          user?.uid === author.uid
            ? {
                onEdit: handleEditDiary,
                onDelete: () => setIsModalOpen(true),
              }
            : undefined
        }
      />
      <Modal.ConfirmDelete
        id={String(diary.id)}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onAfterClose={handleAfterModalClose}
        onDelete={() => {
          dispatch(
            deleteDiary({ firestore, userId: author.uid, diaryId: diary.id })
          );
        }}
      />
      <PageBottomNotifier
        text="日記を削除しました"
        status={notifierStatus as NotifierStatus}
      />
    </Layout>
  );
};

export const getServerSideProps = async ({
  req,
  query,
}: MyNextContext): Promise<GetServerSidePropsResult<UserDiaryPageProps>> => {
  const store = initializeStore();

  const { userId, diaryId } = query as { userId: string; diaryId: string };

  const firestore = req.firebaseServer.firestore();
  // TODO author が null だった場合の処理はサービスで吸収する
  const author = await getUserFromFirestore({ firestore, userId });

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
    query: {
      firestore,
      userId,
      diaryId,
    },
  });
  store.dispatch(getDiary.done({ params, result: diary.body }));

  return {
    props: {
      author,
      diary: diary.body,
    },
  };
};

export default UserDiaryPage;
