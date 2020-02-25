import React from "react";
import { NextPage } from "next";
import styled from "styled-components";
import Layout from "../components/Layout";
import EditForm from "../components/EditForm";

const StyledEditForm = styled(EditForm)`
  margin-top: 24px;
`;

const Edit: NextPage = () => {
  return (
    <Layout>
      <h1>日記を書く</h1>
      <StyledEditForm />
    </Layout>
  );
};

export default Edit;
