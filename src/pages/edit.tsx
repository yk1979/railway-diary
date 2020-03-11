import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Layout from "../components/Layout";

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
