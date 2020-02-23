import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import Layout from "../components/Layout";
import Editor from "../components/Editor";

const StyledEditor = styled(Editor)`
  margin-top: 24px;
`;

const Edit: NextPage = () => {
  return (
    <Layout>
      <h1>日記を書く</h1>
      <StyledEditor />
    </Layout>
  );
};

export default Edit;
