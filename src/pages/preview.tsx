import { NextPage } from "next";
import { MyNextContext } from "next-redux-wrapper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { storage } from "../../firebase";
import Button from "../components/Button";
import DiaryViewer from "../components/DiaryViewer";
import Layout from "../components/Layout";
import { createDiaryToFirestore } from "../lib/firestore";
import { RootState, wrapper } from "../store";
import { deleteDraft } from "../store/diary/actions";
import { Diary } from "../store/diary/types";
import { userSignIn } from "../store/user/actions";
import { User } from "../store/user/types";

const BackButton = styled(Button)`
  margin-top: 16px;
`;

type PreviewPageProps = {
  user: User;
};

const storageRef = storage.ref();

const PreviewPage: NextPage<PreviewPageProps> = ({
  user,
}: PreviewPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const diary = useSelector((state: RootState) => state.diary as Diary);

  return (
    <Layout userId={user ? user.uid : null}>
      {user &&
        (diary ? (
          <DiaryViewer
            diary={diary}
            buttons={{
              onSave: async () => {
                createDiaryToFirestore({ user, diary });
                dispatch(deleteDraft());
                // TODO パス等を見直す
                diary.files?.forEach((file) => {
                  storageRef.child(`${user.uid}/${file.name}`).put(file);
                });
                // TODO ローディング処理
                router.push(`/user/${user.uid}`);
              },
              onBack: () => {
                router.push("/edit");
              },
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
          picture: token.picture,
        })
      );
    }

    const { user } = store.getState();

    return {
      props: {
        user,
      },
    };
  }
);
