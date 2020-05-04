import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { firestore } from "../../firebase";
import Layout from "../components/Layout";
import Preview from "../components/Preview";
import { RootState } from "../store";
import { deleteDraft } from "../store/diary/actions";

const PreviewPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const diary = useSelector((state: RootState) => state.diary);

  return (
    <Layout>
      <Preview
        diary={diary}
        onSave={async () => {
          if (diary) {
            await firestore
              .collection("diaries")
              .doc(`${diary.id}`)
              .set({
                id: diary.id,
                title: diary.title,
                body: diary.body
              });
            dispatch(deleteDraft(diary.id));
            router.push("/mypage");
          }
        }}
        onBack={() => {
          router.push("/edit");
        }}
      />
    </Layout>
  );
};

export default PreviewPage;
