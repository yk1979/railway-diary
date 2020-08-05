import { format } from "date-fns-tz";
import parseISO from "date-fns/parseISO";
import { NextPage } from "next";
import { MyNextContext } from "next-redux-wrapper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";

import { storage } from "../../../../../firebase";
import DiaryViewer from "../../../../components/DiaryViewer";
import Layout from "../../../../components/Layout";
import UserProfile from "../../../../components/UserProfile";
import { getUserFromFirestore } from "../../../../lib/firestore";
import { wrapper } from "../../../../store";
import { createDraft, getDiary } from "../../../../store/diary/actions";
import { Diary } from "../../../../store/diary/types";
import { userSignIn } from "../../../../store/user/actions";
import { User } from "../../../../store/user/types";

const StyledDiaryViewer = styled(DiaryViewer)`
  margin-top: 24px;
`;

type UserDiaryPageProps = {
  author: User;
  diary: Diary;
  user: User;
};

// TODO ブラウザバックでauthorのデータがうまく取れない問題を修正
const UserDiaryPage: NextPage<UserDiaryPageProps> = ({
  author,
  diary,
  user,
}: UserDiaryPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const storageRef = storage.ref();
    storageRef
      // TODO 画像ファイル名ベタ書きの部分を修正する
      .child(`${user.uid}/${diary.id}/IMG_20191110_021337.jpg`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      })
      // TODO エラー処理正しく
      .catch(function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            console.log(error.code);
            // File doesn't exist
            break;

          case "storage/unauthorized":
            console.log(error.code);
            // User doesn't have permission to access the object
            break;

          case "storage/canceled":
            console.log(error.code);
            // User canceled the upload
            break;
          case "storage/unknown":
            console.log(error.code);
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }, [user.uid, diary.id]);

  return (
    <Layout userId={user ? user.uid : null}>
      <UserProfile
        user={{
          uid: author.uid,
          name: author.name || "unknown",
        }}
        thumbnail={author.picture}
        info={{
          text: format(parseISO(diary.lastEdited), "yyyy-MM-dd HH:mm", {
            timeZone: "Asia/Tokyo",
          }),
          date: diary.lastEdited,
        }}
      />
      {/* TODO 以下は表示確認なので正しいUIに落とし込む */}
      <img src={imageUrl} width="100" />
      <StyledDiaryViewer
        diary={diary}
        // TODO fix
        controller={
          user?.uid === author.uid
            ? {
                onEdit: () => {
                  dispatch(
                    createDraft({
                      id: diary.id,
                      title: diary.title,
                      body: diary.body,
                      lastEdited: "",
                    })
                  );
                  router.push("/edit");
                },
                // TODO 修正
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onDelete: () => {},
              }
            : undefined
        }
      />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, query, store }: MyNextContext) => {
    const userId = query.userId as string;
    const diaryId = query.diaryId as string;
    const token = req?.session?.decodedToken;
    let diary!: Diary;
    let author!: User;

    if (token) {
      store.dispatch(
        userSignIn({
          uid: token.uid,
          name: token.name,
          picture: token.picture,
        })
      );

      try {
        const firestore = req.firebaseServer?.firestore();
        if (!firestore) {
          throw new Error("firestore not found");
        }

        author = await getUserFromFirestore({ firestore, userId });
        store.dispatch(
          getDiary({
            firestore,
            userId,
            diaryId,
          })
        );
        store.dispatch(END);
        await store.sagaTask?.toPromise();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }

    const { diary: diaryData, user } = store.getState();

    if (!diaryData) {
      // TODO nextの404ページに飛ばしたい
      // eslint-disable-next-line
        // res.status(404).send("not found");
    } else {
      diary = diaryData;
    }

    return {
      props: {
        author,
        diary,
        user,
      },
    };
  }
);

export default UserDiaryPage;
