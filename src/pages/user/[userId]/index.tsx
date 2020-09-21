import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";

import firebase from "../../../../firebase";
import { firestore } from "../../../../firebase";
import Button, { buttonTheme } from "../../../components/Button";
import DiaryCard from "../../../components/DiaryCard";
import EditButton from "../../../components/EditButton";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import UserProfile from "../../../components/UserProfile";
import BreakPoint from "../../../constants/BreakPoint";
import { specterRead } from "../../../lib/client";
import { getUserFromFirestore } from "../../../lib/firestore";
import {
  IndexDiariesServiceBody,
  IndexDiariesServiceQuery,
} from "../../../server/services/diaries/IndexDiariesService";
import { wrapper } from "../../../store";
import { setDiaries } from "../../../store/diaries/actions";
import { Diary } from "../../../store/diaries/types";
import { userSignIn } from "../../../store/user/actions";
import { User } from "../../../store/user/types";

const StyledLayout = styled(Layout)`
  > div {
    padding-bottom: 88px;
  }
`;

const StyledUserProfile = styled(UserProfile)`
  margin-top: 16px;
`;

const DiaryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  gap: 16px;
  margin-top: 24px;
  @media (min-width: ${BreakPoint.Large}px) {
    grid-template-columns: repeat(auto-fill, 343px);
  }
`;

const NoDiaryText = styled.p`
  margin-top: 32px;
  text-align: center;
`;

const StyledEditButton = styled(EditButton)`
  position: fixed;
  right: 16px;
  bottom: 16px;
`;

const StyledLoginButton = styled(Button)`
  margin-top: 24px;
`;

type UserPageProps = {
  author: User;
  user: User;
  diaries: Diary[];
};

const UserPage: NextPage<UserPageProps> = ({ author, user, diaries }) => {
  const dispatch = useDispatch();

  const [unsubscribeDb, setUnsubscribeDb] = useState<{
    [key: string]: (() => void) | undefined;
  }>({});

  const addDbListener = (id: string) => {
    const listener = firestore.collection(`users/${id}/diaries`).onSnapshot(
      (querySnapshot) => {
        const res: Diary[] = [];
        querySnapshot.forEach((doc) => {
          res.push(doc.data() as Diary);
        });
        if (res.length > 0) {
          dispatch(setDiaries(res));
        }
      },
      (err) => {
        // eslint-disable-next-line no-console
        console.error(
          "Error, could not fetch diary data in client side: ",
          err
        );
      }
    );
    setUnsubscribeDb({ listener });
  };

  const removeDbListener = () => {
    if (unsubscribeDb.listener) {
      unsubscribeDb.listener();
    }
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        addDbListener(author.uid);
      } else {
        removeDbListener();
      }
    });
  }, [user?.uid]);

  return (
    <StyledLayout userId={user ? user.uid : null}>
      {user && (
        <>
          <Heading.Text1 text="てつどうの記録" />
          <StyledUserProfile
            user={{
              uid: author.uid,
              name: author.name || "unknown",
            }}
            thumbnail={author.picture}
          />
          {diaries.length > 0 ? (
            <DiaryList>
              {diaries.map((d) => (
                <DiaryCard
                  key={d.id}
                  diary={d}
                  url={`/user/${author.uid}/diary/${d.id}`}
                />
              ))}
            </DiaryList>
          ) : (
            <NoDiaryText>まだ日記はありません</NoDiaryText>
          )}
          <StyledEditButton />
        </>
      )}
      {user?.uid === author.uid && (
        <StyledLoginButton
          text="ログアウトする"
          onClick={() => {
            window.location.href = "/login";
          }}
          theme={buttonTheme.back}
        />
      )}
    </StyledLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<{
  props: UserPageProps;
}>(async ({ req, res, query, store }) => {
  const userId = query.userId as string;
  const token = req?.session?.decodedToken;
  let author!: User;
  const firestore = req?.firebaseServer.firestore();

  if (!token) {
    res.redirect("/login");
  }

  // TODO 存在しないuserId叩かれた時エラーにしたい
  store.dispatch(
    userSignIn({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uid: token!.uid,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      name: token!.name,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      picture: token!.picture,
    })
  );
  try {
    // const firestore = req?.firebaseServer.firestore();
    author = await getUserFromFirestore({ firestore, userId });
    store.dispatch(END);
    await store.sagaTask?.toPromise();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error, could not fetch diary data in server side: ", err);
  }
  const diaries = await specterRead<
    Record<string, any>,
    IndexDiariesServiceQuery,
    IndexDiariesServiceBody
  >({
    serviceName: "index_diaries",
    query: {
      firestore,
      userId,
    },
  });
  const { user } = store.getState();

  return {
    props: {
      author,
      user,
      diaries: diaries.body,
    },
  };
});

export default UserPage;
