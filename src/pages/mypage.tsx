import React from "react";
import styled from "styled-components";

import firebase from "../../firebase";
import DiaryItem from "../components/DiaryItem";
import EditButton from "../components/EditButton";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { Diary } from "../store/diary/types";

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
  position: absolute;
  right: 16px;
  bottom: 20px;
`;

type MyPageProps = {
  diaries: Diary[];
};

const MyPage = ({ diaries }: MyPageProps) => (
  <Layout>
    <Heading.Text1 text="てつどうの記録" />
    {diaries.length > 0 ? (
      <DiaryList>
        {diaries.map(d => (
          <DiaryItem key={d.id} diary={d} />
        ))}
      </DiaryList>
    ) : (
      <NoDiaryText>まだ日記はありません</NoDiaryText>
    )}
    <StyledEditButton />
  </Layout>
);

MyPage.getInitialProps = async () => {
  const diaries: Diary[] = [];
  const firestore = firebase.firestore();

  const collections = await firestore.collection("diaries").get();
  collections.forEach(doc => diaries.push(doc.data() as Diary));

  return {
    diaries
  };
};

export default MyPage;
