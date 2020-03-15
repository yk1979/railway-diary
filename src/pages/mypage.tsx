import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import DiaryItem from "../components/DiaryItem";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { RootState } from "../store";
import { Diary } from "../store/diary/types";

const DiaryList = styled.div`
  display: grid;
  grid-template-rows: 95px;
  grid-template-columns: repeat(auto-fill, 343px);
  gap: 16px;
  margin-top: 24px;
`;

const MyPage = () => {
  const diaries = useSelector<RootState, Diary[]>(state => state.diaries);
  return (
    <Layout>
      <Heading.Text1 text="てつどうの記録" />
      <DiaryList>
        {diaries.map(d => (
          <DiaryItem key={d.id} diary={d} />
        ))}
      </DiaryList>
    </Layout>
  );
};

export default MyPage;
