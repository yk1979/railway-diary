import { MyNextContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { firestore } from "../../firebase";
import Button from "../components/Button";
import DiaryViewer from "../components/DiaryViewer";
import Layout from "../components/Layout";
import { RootState } from "../store";
import { deleteDraft } from "../store/diary/actions";
import { userSignIn } from "../store/user/actions";
import { UserState } from "../store/user/types";

const BackButton = styled(Button)`
  margin-top: 16px;
`;

type PreviewPageProps = {
  userData: UserState;
};

const PreviewPage: NextPage<PreviewPageProps> = ({
  userData
}: PreviewPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const diary = useSelector((state: RootState) => state.diary);

  useEffect(() => {
    if (userData) {
      dispatch(userSignIn(userData));
    }
  }, []);

  const user = useSelector((state: RootState) => state.user) || userData;

  return (
    <Layout userId={user ? user.uid : null}>
      {user &&
        (diary ? (
          <DiaryViewer
            diary={diary}
            controller={{
              onSave: async () => {
                // TODO まとめて
                await firestore
                  .collection(`/users/`)
                  .doc(user.uid)
                  .set({ name: user.name, picture: user.picture });
                await firestore
                  .collection(`/users/${user.uid}/diaries`)
                  .doc(`${diary.id}`)
                  .set({
                    id: diary.id,
                    title: diary.title,
                    body: diary.body,
                    lastEdited: new Date()
                  });
                dispatch(deleteDraft());
                // TODO ローディング処理
                router.push(`/user/${user.uid}`);
              },
              onBack: () => {
                router.push("/edit");
              }
            }}
          />
        ) : (
          <>
            <div>編集中の日記はありません</div>
            <BackButton
              text="日記を書く"
              onClick={(e: Event) => {
                e.preventDefault();
                window.location.href = "/edit";
              }}
            />
          </>
        ))}
    </Layout>
  );
};

export default PreviewPage;

PreviewPage.getInitialProps = async ({ req }: MyNextContext) => {
  const token = req?.session?.decodedToken;
  const userData: UserState = token
    ? {
        uid: token.uid,
        name: token.name,
        picture: token.picture
      }
    : null;

  return {
    userData
  };
};
