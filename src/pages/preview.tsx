import { GetServerSidePropsResult, NextPage } from "next";
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
import { deleteDraft } from "../redux/modules/diaries";
import { userSignIn } from "../redux/modules/user";
import { User } from "../redux/modules/user";
import { RootState, initializeStore } from "../redux/store";
import { MyNextContext } from "../types/next";

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

const PreviewPage: NextPage<PreviewPageProps> = ({ user }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // TODO SSRで取得する
  const diary = useSelector((state: RootState) => state.diaries[0]);

  const handleOnSave = async () => {
    const storageRef = storage.ref(`${user.uid}/${diary.id}`);
    // TODO アップロード後、画像を日記データと紐づけて管理したい
    // TODO アップロード済みの画像は再度アップロードしない
    // TODO 型fix
    diary.imageUrls?.forEach((image) => {
      storageRef.child(uuid()).put(convertBase64ToBlob(image));
    });
    createDiaryToFirestore({ user, diary });
    dispatch(deleteDraft());
    // TODO ローディング処理
    router.push(`/user/${user.uid}`);
  };

  const handleOnBack = () => {
    router.push("/create");
  };

  return (
    <Layout userId={user ? user.uid : null}>
      {user &&
        (diary ? (
          <DiaryViewer
            diary={diary}
            buttons={{
              onSave: handleOnSave,
              onBack: handleOnBack,
            }}
          />
        ) : (
          <>
            <div>編集中の日記はありません</div>
            <BackButton
              text="日記を書く"
              onClick={(e: Event) => {
                e.preventDefault();
                window.location.href = "/create";
              }}
            />
          </>
        ))}
    </Layout>
  );
};

export default PreviewPage;

export const getServerSideProps = ({
  req,
  res,
}: MyNextContext): GetServerSidePropsResult<PreviewPageProps> | undefined => {
  const store = initializeStore();
  const token = req?.session?.decodedToken;

  if (!token) {
    res.redirect("/login");
  } else {
    store.dispatch(
      userSignIn({
        uid: token.uid,
        name: token.name,
        picture: token.picture,
      })
    );

    // TODO 色々微妙だけど応急処置 ログイン処理をappに寄せたい
    const { user } = store.getState() as { user: User };

    return {
      props: {
        user,
      },
    };
  }
};
