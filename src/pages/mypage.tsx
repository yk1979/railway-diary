import { NextPageContext } from "next";
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

// type MyPageProps = {
//   diaries: Diary[];
// };

const getDiaries = async () => {
  const res: Diary[] = [];
  const collections = await firestore.collection("diaries").get();
  collections.forEach(doc => res.push(doc.data() as Diary));
  return res;
};

const MyPage = (/* { diaries }: MyPageProps */) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // id未定状態の初期値として0を指定している
  const [modalId, setModalId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [notifierStatus, setNotifierStatus] = useState("hidden");

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    function subscribeAuthStatusChange() {
      firebase.auth().onAuthStateChanged(user => {
        setIsUserSignedIn(!!user);
      });
    }
    subscribeAuthStatusChange();
    return function unsubscribeAuthStatus() {
      subscribeAuthStatusChange();
    };
  }, []);

  const diaries: Diary[] = [];
  const [diariesList, setDiariesList] = useState(diaries);

  const handleDeleteDiary = (id: string) => {
    setModalId(id);
    setIsOpen(true);
  };

  const handleAfterModalClose = async () => {
    setNotifierStatus("visible" as NotifierStatus);
    const res = await getDiaries();
    setDiariesList(res);
    setTimeout(() => setNotifierStatus("hidden" as NotifierStatus), 1000);
  };

  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうの記録" />
      {isUserSignedIn ? (
        <>
          {diariesList.length > 0 ? (
            <DiaryList>
              {diariesList.map(d => (
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
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
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

// MyPage.getInitialProps = async ({ req }: NextPageContext) => {
//   const diaries = await getDiaries();

//   return {
//     diaries
//   };
// };

export default MyPage;
