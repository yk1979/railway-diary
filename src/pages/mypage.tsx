import React from "react";
import { useSelector } from "react-redux";

import Layout from "../components/Layout";
import { RootState } from "../store";
import { Diary } from "../store/diary/types";

const MyPage = () => {
  const diaries = useSelector<RootState, Diary[]>(state => state.diaries);
  return (
    <Layout>
      {diaries.map(d => (
        <div key={d.id}>
          {d.title}
          <p>{d.body}</p>
        </div>
      ))}
    </Layout>
  );
};

export default MyPage;
