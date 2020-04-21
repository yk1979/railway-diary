import { auth } from "firebase-admin";
import { MyNextContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { handleSignIn, handleSignOut } from "../../auth";
import firebase, { firestore } from "../../firebase";
import Button, { buttonTheme } from "../components/Button";
import DiaryItem from "../components/DiaryItem";
import EditButton from "../components/EditButton";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import PageBottomNotifier, {
  NotifierStatus
} from "../components/PageBottomNotifier";
import BreakPoint from "../constants/BreakPoint";
import { createDraft } from "../store/diary/actions";
import { Diary } from "../store/diary/types";

const StyledLayout = styled(Layout)`
  > div {
    padding-bottom: 88px;
  }
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

type MyPageProps = {
  token: auth.DecodedIdToken | null;
};

// TODO: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
// TODO: FirebaseError: Missing or insufficient permissions.

const MyPage: NextPage<MyPageProps> = ({ token }: MyPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [modalId, setModalId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifierStatus, setNotifierStatus] = useState("hidden");
  const [isUserSignedIn, setIsUserSignedIn] = useState(!!token);
  const [unSubscribeDb, setUnsubscribeDb] = useState<{ [key: string]: any }>(
    {}
  );
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const addDbListener = () => {
    const listener = firestore.collection("diaries").onSnapshot(
      querySnapshot => {
        const res: Diary[] = [];
        querySnapshot.forEach(doc => {
          res.push(doc.data() as Diary);
        });
        if (res.length > 0) {
          setDiaries(res);
        }
      },
      err => {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    );
    setUnsubscribeDb({ listener });
  };

  const removeDbListener = () => {
    if (unSubscribeDb.listener) {
      unSubscribeDb.listener();
    }
  };

  const handleDeleteDiary = (id: string) => {
    setModalId(id);
    setIsModalOpen(true);
  };

  const handleAfterModalClose = async () => {
    setNotifierStatus("visible" as NotifierStatus);
    setTimeout(() => setNotifierStatus("hidden" as NotifierStatus), 1000);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setIsUserSignedIn(!!user);
      if (user) {
        user.getIdToken().then(tkn =>
          fetch("/api/login", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ tkn })
          }).then(() => addDbListener())
        );
      } else {
        fetch("/api/logout", {
          method: "POST",
          credentials: "same-origin"
        }).then(() => removeDbListener());
      }
    });
  }, []);

  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうの記録" />
      {isUserSignedIn ? (
        <>
          {diaries.length > 0 ? (
            <DiaryList>
              {diaries.map(d => (
                <DiaryItem
                  key={d.id}
                  diary={d}
                  onEdit={() => {
                    dispatch(
                      createDraft({ id: d.id, title: d.title, body: d.body })
                    );
                    router.push("/edit");
                  }}
                  onDelete={() => handleDeleteDiary(String(d.id))}
                />
              ))}
            </DiaryList>
          ) : (
            <NoDiaryText>まだ日記はありません</NoDiaryText>
          )}
          <StyledEditButton />
          <Modal.ConfirmDelete
            id={modalId}
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onAfterClose={handleAfterModalClose}
          />
          <PageBottomNotifier
            text="日記を削除しました"
            status={notifierStatus as NotifierStatus}
          />
        </>
      ) : (
        <></>
      )}
      <StyledLoginButton
        text={isUserSignedIn ? "ログアウトする" : "ログインする"}
        onClick={() => {
          return isUserSignedIn ? handleSignOut() : handleSignIn();
        }}
        theme={isUserSignedIn ? buttonTheme.back : buttonTheme.primary}
      />
    </StyledLayout>
  );
};

MyPage.getInitialProps = async ({ req }: MyNextContext) => {
  const token = req && req.session ? req.session.decodedToken : null;

  return {
    token
  };
};

export default MyPage;
