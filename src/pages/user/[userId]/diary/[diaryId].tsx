import { MyNextContext, NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";

import DiaryViewer from "../../../../components/DiaryViewer";
import Layout from "../../../../components/Layout";
import { RootState } from "../../../../store";
import { Diary } from "../../../../store/diary/types";
import { UserState } from "../../../../store/user/types";

type UserDiaryPageProps = {
  signedInUser: UserState;
  // author: {
  //   uid: string;
  //   name: string;
  // };
  diary: Diary;
};

const UserDiaryPage: NextPage<UserDiaryPageProps> = ({
  signedInUser,
  // author,
  diary
}: UserDiaryPageProps) => {
  const user = useSelector((state: RootState) => state.user) || signedInUser;

  return (
    <Layout userId={user ? user.uid : null}>
      <DiaryViewer diary={diary} />
    </Layout>
  );
};

UserDiaryPage.getInitialProps = async ({ req, res, query }: MyNextContext) => {
  const userId = query.userId as string;
  const diaryId = query.diaryId as string;
  const token = req?.session?.decodedToken;
  let diary!: Diary;

  const signedInUser: UserState = token
    ? {
        uid: token.uid,
        name: token.name
      }
    : null;

  const author = {
    uid: userId,
    name: ""
  };

  if (signedInUser) {
    try {
      author.name = await req?.firebaseServer
        .firestore()
        .collection(`users`)
        .doc(userId)
        .get()
        .then(doc => doc.data())
        .then(response => response?.name);
      const diaryData = await req?.firebaseServer
        .firestore()
        .collection(`users/${userId}/diaries/`)
        .doc(diaryId)
        .get()
        .then(doc => doc.data() as Diary);

      if (!diaryData) {
        // TODO nextの404ページに飛ばしたい
        // eslint-disable-next-line
        res?.status(404).send("not found");
      } else {
        diary = diaryData;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  return {
    signedInUser,
    // author,
    diary
  };
};

export default UserDiaryPage;
