import React, { useState } from "react";
import styled from "styled-components";

import firestore from "../../firebase";
import DiaryItem from "../components/DiaryItem";
import EditButton from "../components/EditButton";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import PageBottomNotifier, {
  NotifierStatus
} from "../components/PageBottomNotifier";
import { Diary } from "../store/diary/types";

const StyledLayout = styled(Layout)`
  > div {
    padding-bottom: 88px;
  }
`;

const DiaryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 343px);
  gap: 16px;
  margin-top: 24px;
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

type MyPageProps = {
  diaries: Diary[];
};

const getDiaries = async () => {
  const res: Diary[] = [];
  const collections = await firestore.collection("diaries").get();
  collections.forEach(doc => res.push(doc.data() as Diary));
  return res;
};

const MyPage = ({ diaries }: MyPageProps) => {
  const [diariesList, setDiariesList] = useState(diaries);
  // id未定状態の初期値として0を指定している
  const [modalId, setModalId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);
  const [notifierStatus, setNotifierStatus] = useState("hidden");

  const handleDelete = (id: string) => {
    setModalId(id);
    setIsOpen(true);
  };

  const handleAfterModalClose = async () => {
    setNotifierStatus("visible" as NotifierStatus);
    const res = await getDiaries();
    setDiariesList(res);
  };

  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうの記録" />
      {diariesList.length > 0 ? (
        <DiaryList>
          {diariesList.map(d => (
            <DiaryItem
              key={d.id}
              diary={d}
              onDelete={() => handleDelete(String(d.id))}
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
    </StyledLayout>
  );
};

MyPage.getInitialProps = async () => {
  const diaries = await getDiaries();

  return {
    diaries
  };
};

export default MyPage;
