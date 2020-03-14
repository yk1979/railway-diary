import React from "react";
import { connect } from "react-redux";

import Layout from "../components/Layout";
import { DiaryState } from "../store/diary/types";

type MyPageProps = {
  diaries: DiaryState;
};

type Props = MyPageProps & {};

const MyPage = ({ diaries }: Props) => (
  <Layout>
    {diaries.map(d => (
      <div>
        {d.id}
        <p>{d.text}</p>
      </div>
    ))}
  </Layout>
);

const mapStateToProps = (state: DiaryState) => {
  return {
    diaries: state
  };
};

export default connect(mapStateToProps)(MyPage);
