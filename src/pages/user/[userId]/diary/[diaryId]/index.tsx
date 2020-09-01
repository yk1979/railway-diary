import { format } from "date-fns-tz";
import parseISO from "date-fns/parseISO";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";

import { firestore } from "../../../../../../firebase";
import DiaryViewer from "../../../../../components/DiaryViewer";
import Layout from "../../../../../components/Layout";
import Modal from "../../../../../components/Modal";
import PageBottomNotifier, {
  NotifierStatus,
} from "../../../../../components/PageBottomNotifier/PageBottomNotifier";
import UserProfile from "../../../../../components/UserProfile";
import { getUserFromFirestore } from "../../../../../lib/firestore";
import { wrapper } from "../../../../../store";
import { deleteDiary, getDiary } from "../../../../../store/diaries/actions";
import { Diary } from "../../../../../store/diaries/types";
import { userSignIn } from "../../../../../store/user/actions";
import { User } from "../../../../../store/user/types";

const StyledDiaryViewer = styled(DiaryViewer)`
  margin-top: 24px;
`;

type UserDiaryPageProps = {
  author: User;
  diary: Diary;
  user: User;
};

// TODO ブラウザバックでauthorのデータがうまく取れない問題を修正
const UserDiaryPage: NextPage<UserDiaryPageProps> = ({
  author,
  diary,
  user,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

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

export const getServerSideProps = wrapper.getServerSideProps<{
  props: UserDiaryPageProps;
}>(async ({ req, query, store }) => {
  const { userId, diaryId } = query as { userId: string; diaryId: string };
  const token = req?.session?.decodedToken;
  let author!: User;

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
      author = await getUserFromFirestore({ firestore, userId });
      store.dispatch(
        getDiary({
          firestore,
          userId,
          diaryId,
        })
      );
      store.dispatch(END);
      await store.sagaTask?.toPromise();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  const { diaries, user } = store.getState();

  return {
    props: {
      author,
      diary: diaries[0],
      user,
    },
  };
});

export default UserDiaryPage;