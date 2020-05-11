import { MyNextContext, NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import DiaryViewer from "../../../../components/DiaryViewer";
import Layout from "../../../../components/Layout";
import UserProfile from "../../../../components/UserProfile";
import { RootState } from "../../../../store";
import { Diary } from "../../../../store/diary/types";
import { User, UserState } from "../../../../store/user/types";

const StyledDiaryViewer = styled(DiaryViewer)`
  margin-top: 24px;
`;

type UserDiaryPageProps = {
  signedInUser: UserState;
  author: User;
  diary: Diary;
};

const UserDiaryPage: NextPage<UserDiaryPageProps> = ({
  signedInUser,
  author,
  diary
}: UserDiaryPageProps) => {
  const user = useSelector((state: RootState) => state.user) || signedInUser;

  return (
    <Layout userId={user ? user.uid : null}>
      <UserProfile
        userName={author.name || "unknown"}
        thumbnail={author.picture}
        info={{
          text: "更新日が入ります",
          as: "time"
        }}
      />
      <StyledDiaryViewer diary={diary} />
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
        name: token.name,
        picture: token.picture
      }
    : null;

  const author = {
    uid: userId,
    name: "",
    picture: ""
  };

  if (signedInUser) {
    try {
      await req?.firebaseServer
        .firestore()
        .collection(`users`)
        .doc(userId)
        .get()
        .then(doc => doc.data())
        .then(response => {
          author.name = response?.name;
          author.picture = response?.picture;
        });
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
    author,
    diary
  };
};

export default UserDiaryPage;
