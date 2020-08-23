import { NextPage } from "next";
import { MyNextContext } from "next-redux-wrapper";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

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

const convertBase64ToBlob = (base64Text: string): Blob => {
  const binaryStr = atob(base64Text.replace(/^.*,/, ""));
  const buffer = new Uint8Array(binaryStr.length).map((_, i) =>
    binaryStr.charCodeAt(i)
  );

  return new Blob([buffer.buffer], {
    // base64エンコード文字列であれば必ずマッチする
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    type: base64Text.match(/image\/.*(?=;)/)![0],
  });
};

type PreviewPageProps = {
  user: User;
};

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
                const storageRef = storage.ref(`${user.uid}/${diary.id}`);
                // TODO アップロード後、画像を日記データと紐づけて管理したい
                // TODO アップロード済みの画像は再度アップロードしない
                diary.imageUrls?.forEach((image) => {
                  storageRef.child(uuid()).put(convertBase64ToBlob(image));
                });
                createDiaryToFirestore({ user, diary });
                dispatch(deleteDraft());
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
