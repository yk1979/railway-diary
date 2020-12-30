import { format } from "date-fns-tz";
import parseISO from "date-fns/parseISO";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
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
import { useAuthUser } from "../../../../../context/userContext";
import { specterRead } from "../../../../../lib/client";
import { deleteDiaryFromFirestore } from "../../../../../lib/firestore";
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
import {
  ShowUserServiceBody,
  ShowUserServiceQuery,
} from "../../../../../server/services/user/ShowUserService";
import { User } from "../../../../../types";
import { MyGetServerSideProps } from "../../../../../types/next";

const StyledDiaryViewer = styled(DiaryViewer)`
  margin-top: 24px;
`;

type UserDiaryPageProps = {
  user: User;
  diary: Diary;
};

const UserDiaryPage: NextPage<UserDiaryPageProps> = ({ user, diary }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authUser } = useAuthUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifierStatus, setNotifierStatus] = useState("hidden");

  useEffect(() => {
    // クライアント側で store に値が入ってないと edit ページに遷移した時にうまくいかないので苦肉の策でこうした
    // しかしここでわざわざこんなアクションを dispatch するの微妙すぎるのでどうにかしたい
    // サーバの store をマージしようとした時に初期値で上書きしようとしてるのが敗因
    dispatch(setDiary(diary));
  }, [diary?.id]);

  const handleEditDiary = () => {
    router.push(`/user/${user.id}/diary/${diary.id}/edit`);
  };

  const handleAfterModalClose = async () => {
    setNotifierStatus("visible" as NotifierStatus);
    await new Promise((resolve) => {
      setTimeout(() => {
        setNotifierStatus("hidden" as NotifierStatus);
        resolve();
      }, 1000);
    });
    router.push(`/user/${user.id}/`);
  };

  return (
    <Layout>
      <UserProfile
        user={{
          uid: user.id,
          name: user.name,
        }}
        thumbnail={user.photoUrl}
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
          user.id === authUser?.id
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
        onDelete={async () => {
          const params = { firestore, userId: user.id, diaryId: diary.id };
          await deleteDiaryFromFirestore(params);
          dispatch(deleteDiary(params));
        }}
      />
      <PageBottomNotifier
        text="日記を削除しました"
        status={notifierStatus as NotifierStatus}
      />
    </Layout>
  );
};

export const getServerSideProps: MyGetServerSideProps<UserDiaryPageProps> = async ({
  req,
  query,
}) => {
  const store = initializeStore();

  const { userId, diaryId } = query as { userId: string; diaryId: string };
  const firestore = req.firebaseServer.firestore();
  const params = {
    firestore,
    userId,
    diaryId,
  };
  store.dispatch(getDiary.started(params));

  const [user, diary] = await Promise.all([
    specterRead<
      Record<string, unknown>,
      ShowUserServiceQuery,
      ShowUserServiceBody
    >({
      serviceName: "show_user",
      query: {
        firestore,
        userId,
      },
    }),
    specterRead<
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
    }),
  ]);
  for (const response of [user, diary]) {
    if (response.status !== 200) {
      return { props: {}, notFound: true };
    }
  }
  store.dispatch(getDiary.done({ params, result: diary.body }));

  return {
    props: {
      user: user.body,
      diary: diary.body,
    },
  };
};

export default UserDiaryPage;
