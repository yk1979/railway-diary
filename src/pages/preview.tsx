import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { storage } from "../../firebase";
import Button from "../components/Button";
import DiaryViewer from "../components/DiaryViewer";
import Layout from "../components/Layout";
import { useAuthUser } from "../context/userContext";
import { createDiaryToFirestore } from "../lib/firestore";
import { deleteDraft } from "../redux/modules/diaries";
import { RootState } from "../redux/store";

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

const PreviewPage: NextPage = () => {
  const { authUser } = useAuthUser();
  if (!authUser) {
    return (
      <Layout>
        <Link href="/login">
          <a>ログインしてね</a>
        </Link>
      </Layout>
    );
  }

  const router = useRouter();
  const dispatch = useDispatch();

  // TODO SSRで取得する
  const diary = useSelector((state: RootState) => state.diaries[0]);

  const handleOnSave = async () => {
    const storageRef = storage.ref(`${authUser.id}/${diary.id}`);
    // TODO アップロード後、画像を日記データと紐づけて管理したい
    // TODO アップロード済みの画像は再度アップロードしない
    diary.imageUrls?.forEach((image) => {
      storageRef.child(uuid()).put(convertBase64ToBlob(image));
    });
    createDiaryToFirestore({ user: authUser, diary });
    dispatch(deleteDraft());
    // TODO ローディング処理
    router.push(`/user/${authUser.id}`);
  };

  const handleOnBack = () => {
    router.back();
  };

  return (
    <Layout>
      {authUser &&
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
            <BackButton text="日記を書く" onClick={handleOnBack} />
          </>
        ))}
    </Layout>
  );
};

export default PreviewPage;
