import { MyNextContext, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { firestore } from "../../firebase";
import Layout from "../components/Layout";
import Preview from "../components/Preview";
import { RootState } from "../store";
import { deleteDraft } from "../store/diary/actions";
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

  const user = useSelector((state: RootState) => state.user) || userData;

  return (
    <Layout>
      {user ? (
        <Preview
          diary={diary}
          onSave={async () => {
            if (diary) {
              await firestore
                .collection(`/users/${user?.name || "no name"}/diaries/`)
                .doc(`${diary.id}`)
                .set({
                  id: diary.id,
                  title: diary.title,
                  body: diary.body
                });
              dispatch(deleteDraft(diary.id));
              router.push(`user/${user.uid}`);
            }
          }}
          onBack={() => {
            router.push("/edit");
          }}
        />
      ) : (
        <p>あれれ？何かがおかしいですよこれ</p>
      )}
    </Layout>
  );
};

export default PreviewPage;

PreviewPage.getInitialProps = async ({ req }: MyNextContext) => {
  console.log("edit page get initial props is fired");
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
