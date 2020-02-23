import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Editor from "../components/Editor";

const StyledEditor = styled(Editor)`
  margin-top: 24px;
`;

const SubmitButton = styled(Button.Primary)`
  margin-top: 24px;
`;

const Edit: NextPage = () => (
  <Layout>
    <h1>日記を書く</h1>
    <StyledEditor />
    <SubmitButton text="投稿確認画面に進む" />
  </Layout>
);

export default Edit;
