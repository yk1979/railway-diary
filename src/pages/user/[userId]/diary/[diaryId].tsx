import { format } from "date-fns-tz";
import parseISO from "date-fns/parseISO";
import { NextPage } from "next";
import { MyNextContext } from "next-redux-wrapper";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";

import { firestore } from "../../../../../firebase";
import DiaryViewer from "../../../../components/DiaryViewer";
import Layout from "../../../../components/Layout";
import Modal from "../../../../components/Modal";
import PageBottomNotifier, {
  NotifierStatus,
} from "../../../../components/PageBottomNotifier/PageBottomNotifier";
import UserProfile from "../../../../components/UserProfile";
import { getUserFromFirestore } from "../../../../lib/firestore";
import { wrapper } from "../../../../store";
import {
  createDraft,
  deleteDiary,
  getDiary,
} from "../../../../store/diary/actions";
import { Diary } from "../../../../store/diary/types";
import { userSignIn } from "../../../../store/user/actions";
import { User } from "../../../../store/user/types";

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
}: UserDiaryPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifierStatus, setNotifierStatus] = useState("hidden");

  const handleEditDiary = () => {
    dispatch(
      createDraft({
        id: diary.id,
        title: diary.title,
        body: diary.body,
        imageUrls: diary.imageUrls,
        lastEdited: "",
      })
    );
    router.push("/edit");
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
        id={diary.id}
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

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, query, store }: MyNextContext) => {
    const userId = query.userId as string;
    const diaryId = query.diaryId as string;
    const token = req?.session?.decodedToken;
    let diary!: Diary;
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
        const firestore = req.firebaseServer?.firestore();
        if (!firestore) {
          throw new Error("firestore not found");
        }

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

    const { diary: diaryData, user } = store.getState();

    if (!diaryData) {
      // TODO nextの404ページに飛ばしたい
      // eslint-disable-next-line
        // res.status(404).send("not found");
    } else {
      diary = diaryData;
    }

    return {
      props: {
        author,
        diary,
        user,
      },
    };
  }
);

export default UserDiaryPage;
