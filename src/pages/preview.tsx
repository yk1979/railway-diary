import { NextPage } from "next";
import { MyNextContext } from "next/dist/next-server/lib/utils";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { firestore } from "../../firebase";
import Button from "../components/Button";
import DiaryViewer from "../components/DiaryViewer";
import Layout from "../components/Layout";
import { RootState, wrapper } from "../store";
import { deleteDraft } from "../store/diary/actions";
import { Diary } from "../store/diary/types";
import { userSignIn } from "../store/user/actions";
import { User } from "../store/user/types";

const BackButton = styled(Button)`
  margin-top: 16px;
`;

type PreviewPageProps = {
  diary: Diary;
  user: User;
};

const PreviewPage: NextPage<PreviewPageProps> = ({
  diary,
  user
}: PreviewPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Layout userId={user ? user.uid : null}>
      {user &&
        (diary ? (
          <DiaryViewer
            diary={diary}
            buttons={{
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

export const getServerSideProps = wrapper.getServerSideProps(
  ({ req, store }: MyNextContext) => {
    const token = req?.session?.decodedToken;

    if (token) {
      store.dispatch(
        userSignIn({
          uid: token.uid,
          name: token.name,
          picture: token.picture
        })
      );
    }

    const { diary, user } = store.getState();

    return {
      props: {
        diary,
        user
      }
    };
  }
);
