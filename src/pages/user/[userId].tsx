import { MyNextContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import firebase, { firestore } from "../../../firebase";
import { handleSignIn, handleSignOut } from "../../auth";
import Button, { buttonTheme } from "../../components/Button";
import DiaryItem from "../../components/DiaryItem";
import EditButton from "../../components/EditButton";
import Heading from "../../components/Heading";
import Layout from "../../components/Layout";
import Modal from "../../components/Modal";
import PageBottomNotifier, {
  NotifierStatus
} from "../../components/PageBottomNotifier";
import BreakPoint from "../../constants/BreakPoint";
import { RootState } from "../../store";
import { createDraft } from "../../store/diary/actions";
import { Diary } from "../../store/diary/types";
import { userSignIn, userSignOut } from "../../store/user/actions";
import { UserState } from "../../store/user/types";

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
  userData: UserState;
  diariesData: Diary[];
};

const UserPage: NextPage<MyPageProps> = ({
  userData,
  diariesData
}: MyPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [unsubscribeDb, setUnsubscribeDb] = useState<{
    [key: string]: (() => void) | undefined;
  }>({});
  const [diaries, setDiaries] = useState<Diary[]>(diariesData);

  const [modalId, setModalId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifierStatus, setNotifierStatus] = useState("hidden");

  const user = useSelector((state: RootState) => state.user);

  const addDbListener = (userId: string) => {
    const listener = firestore.collection(`users/${userId}/diaries`).onSnapshot(
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
    if (unsubscribeDb.listener) {
      unsubscribeDb.listener();
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setModalId(id);
    setIsModalOpen(true);
  };

  const handleAfterModalClose = async () => {
    setNotifierStatus("visible" as NotifierStatus);
    setTimeout(() => setNotifierStatus("hidden" as NotifierStatus), 1000);
  };

  useEffect(() => {
    if (userData) {
      addDbListener(userData.uid);
      dispatch(userSignIn(userData));
    }

    firebase.auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        await fetch("/api/login", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ token })
        });
        dispatch(
          userSignIn({
            uid: currentUser.uid,
            name: currentUser.displayName
          })
        );
        addDbListener(currentUser.uid);
      } else {
        await fetch("/api/logout", {
          method: "POST",
          credentials: "same-origin"
        });
        dispatch(userSignOut());
        removeDbListener();
      }
    });
  }, []);

  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうの記録" />
      {user ? (
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
                  onDelete={() => handleOpenDeleteModal(String(d.id))}
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
            onDelete={async () => {
              await firestore
                .collection(`users/${user.uid}/diaries/`)
                .doc(modalId)
                .delete();
            }}
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
        text={user ? "ログアウトする" : "ログインする"}
        onClick={() => (user ? handleSignOut() : handleSignIn())}
        theme={user ? buttonTheme.back : buttonTheme.primary}
      />
    </StyledLayout>
  );
};

UserPage.getInitialProps = async ({ req, query }: MyNextContext) => {
  const { userId } = query;
  const token = req?.session?.decodedToken;

  const userData: UserState = token
    ? {
        uid: token.uid,
        name: token.name
      }
    : null;

  const diariesData: Diary[] = [];

  if (userData) {
    // eslint-disable-next-line no-unused-expressions
    try {
      const collections = await req?.firebaseServer
        .firestore()
        .collection(`users/${userData.name}/diaries`)
        .get();
      collections!.forEach(doc => {
        diariesData.push(doc.data() as Diary);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  return {
    userId,
    userData,
    diariesData
  };
};

export default UserPage;