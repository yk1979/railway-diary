import { fromUnixTime } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Store } from "express-session";
import { NextPage } from "next";
import { MyNextContext } from "next/dist/next-server/lib/utils";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import firebase, { firestore } from "../../../../firebase";
import Button, { buttonTheme } from "../../../components/Button";
import DiaryCard from "../../../components/DiaryCard";
import EditButton from "../../../components/EditButton";
import Heading from "../../../components/Heading";
import Layout from "../../../components/Layout";
import Modal from "../../../components/Modal";
import PageBottomNotifier, {
  NotifierStatus
} from "../../../components/PageBottomNotifier";
import UserProfile from "../../../components/UserProfile";
import BreakPoint from "../../../constants/BreakPoint";
import { RootState, wrapper } from "../../../store";
import { createDraft } from "../../../store/diary/actions";
import { Diary } from "../../../store/diary/types";
import { userSignIn } from "../../../store/user/actions";
import { User } from "../../../store/user/types";
// import { MyNextContext } from "../../../types/next.d";

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
  diariesData: Diary[];
};

const UserPage: NextPage<UserPageProps> = ({
  author,
  diariesData
}: UserPageProps) => {
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

  const addDbListener = (id: string) => {
    const listener = firestore.collection(`users/${id}/diaries`).onSnapshot(
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

  const handleOpenDeleteModal = (id: string) => {
    setModalId(id);
    setIsModalOpen(true);
  };

  const handleAfterModalClose = async () => {
    setNotifierStatus("visible" as NotifierStatus);
    setTimeout(() => setNotifierStatus("hidden" as NotifierStatus), 1000);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
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
              name: author.name || "unknown"
            }}
            thumbnail={author.picture}
          />
          <button
            type="button"
            onClick={() => {
              dispatch({ type: "SAGA_TEST" });
            }}
          >
            saga test
          </button>
          {diaries.length > 0 ? (
            <DiaryList>
              {diaries.map(d => (
                <DiaryCard
                  key={d.id}
                  diary={d}
                  url={`/user/${author.uid}/diary/${d.id}`}
                  controller={
                    user?.uid === author.uid
                      ? {
                          onEdit: () => {
                            dispatch(
                              createDraft({
                                id: d.id,
                                title: d.title,
                                body: d.body,
                                lastEdited: ""
                              })
                            );
                            router.push("/edit");
                          },
                          onDelete: () => handleOpenDeleteModal(String(d.id))
                        }
                      : undefined
                  }
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
                .collection(`users/${author.uid}/diaries/`)
                .doc(modalId)
                .delete();
            }}
          />
          <PageBottomNotifier
            text="日記を削除しました"
            status={notifierStatus as NotifierStatus}
          />
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

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, query, store }: MyNextContext) => {
    const userId = query.userId as string;
    const token = req?.session?.decodedToken;

    const author = {
      uid: userId,
      name: "",
      picture: ""
    };

    const diariesData: Diary[] = [];

    if (token) {
      store.dispatch(
        userSignIn({
          uid: token.uid,
          name: token.name,
          picture: token.picture
        })
      );
      try {
        await req?.firebaseServer
          .firestore()
          .collection(`users`)
          .doc(userId)
          .get()
          .then(doc => doc.data())
          .then(res => {
            author.name = res?.name;
            author.picture = res?.picture;
          });
        await req?.firebaseServer
          .firestore()
          .collection(`users/${userId}/diaries`)
          .get()
          .then(collections => {
            collections.forEach(doc => {
              const data = doc.data();
              diariesData.push({
                id: data.id,
                title: data.title,
                body: data.body,
                // eslint-disable-next-line no-underscore-dangle
                lastEdited: utcToZonedTime(
                  fromUnixTime(data.lastEdited.seconds),
                  "Asia/Tokyo"
                ).toISOString()
              });
            });
          });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(
          "Error, could not fetch diary data in server side: ",
          err
        );
      }
    }

    return {
      props: {
        author,
        diariesData
      }
    };
  }
);

export default UserPage;
