import { MyNextContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { firestore } from "../../firebase";
import Layout from "../components/Layout";
import Preview from "../components/Preview";
import { RootState } from "../store";
import { deleteDraft } from "../store/diary/actions";
import { userSignIn } from "../store/user/actions";
import { UserState } from "../store/user/types";

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
      {user ? (
        <Preview
          diary={diary}
          onSave={async () => {
            if (diary) {
              // TODO まとめて
              await firestore
                .collection(`/users/`)
                .doc(user.uid)
                .set({ name: user.name });
              await firestore
                .collection(`/users/${user.uid}/diaries`)
                .doc(`${diary.id}`)
                .set({
                  id: diary.id,
                  title: diary.title,
                  body: diary.body
                });
              dispatch(deleteDraft(diary.id));
              // TODO ローディング処理
              router.push(`/user/${user.uid}`);
              router.push("/edit");
            }
          }}
          onBack={() => {
            router.push("/edit");
          }}
        />
      ) : (
        router.push("/edit")
      )}
    </Layout>
  );
};

export default PreviewPage;

PreviewPage.getInitialProps = async ({ req }: MyNextContext) => {
  const token = req?.session?.decodedToken;
  const userData: UserState = token
    ? {
        uid: token.uid,
        name: token.name
      }
    : null;

  return {
    userData
  };
};
