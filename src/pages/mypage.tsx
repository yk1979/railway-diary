import React from "react";

import Layout from "../components/Layout";

type MyPageProps = {
  diaries: { [key: string]: string }[];
};

type Props = MyPageProps & {};

const MyPage = ({ diaries }: Props) => (
  <Layout>
    {diaries.map(d => (
      <div>{d.title}</div>
    ))}
  </Layout>
);

MyPage.getInitialProps = () => {
  const diaries = [
    {
      title: "ほげ"
    }
  ];
  return {
    diaries
  };
};

export default MyPage;
