import React, { useState } from "react";
import styled from "styled-components";

import firestore from "../../firebase";
import Dialogue from "../components/Dialogue";
import DiaryItem from "../components/DiaryItem";
import EditButton from "../components/EditButton";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
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

const MyPage = ({ diaries }: MyPageProps) => {
  // id未定状態の初期値として0を指定している
  const [modalId, setModalId] = useState("0");
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string) => {
    setModalId(id);
    setIsOpen(true);
  };
  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうの記録" />
      {diaries.length > 0 ? (
        <DiaryList>
          {diaries.map(d => (
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
      <Dialogue
        id={modalId}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </StyledLayout>
  );
};

MyPage.getInitialProps = async () => {
  const diaries: Diary[] = [];

  const collections = await firestore.collection("diaries").get();
  collections.forEach(doc => diaries.push(doc.data() as Diary));

  return {
    diaries
  };
};

export default MyPage;
