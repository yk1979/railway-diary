import React from "react";
import styled from "styled-components";

import firebase from "../../firebase";
import DiaryItem from "../components/DiaryItem";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { Diary } from "../store/diary/types";

const DiaryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 343px);
  gap: 16px;
  margin-top: 24px;
`;

type MyPageProps = {
  diaries: Diary[];
};

const MyPage = ({ diaries }: MyPageProps) => (
  <Layout>
    <Heading.Text1 text="てつどうの記録" />
    {diaries && (
      <DiaryList>
        {diaries.map(d => (
          <DiaryItem key={d.id} diary={d} />
        ))}
      </DiaryList>
    )}
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
