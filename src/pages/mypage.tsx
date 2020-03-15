import React from "react";
import { useSelector } from "react-redux";

import Layout from "../components/Layout";
import { Diary, DiaryState } from "../store/diary/types";

const MyPage = () => {
  const diaries = useSelector<DiaryState, Diary[]>(state => state.diaries);
  return (
    <Layout>
      {diaries.map(d => (
        <div key={d.id}>
          {d.id}
          <p>{d.text}</p>
        </div>
      ))}
    </Layout>
  );
};

export default MyPage;
