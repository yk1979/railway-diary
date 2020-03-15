import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Layout from "../components/Layout";
import { RootState } from "../store";

const StyledEditForm = styled(EditForm)`
  margin-top: 24px;
`;

const EditPage = () => {
  const diary = useSelector((state: RootState) =>
    state.diaries.find(d => d.isEditing === true)
  );

  return (
    <Layout>
      <h1>日記を書く</h1>
      <StyledEditForm diary={diary} />
    </Layout>
  );
};

export default EditPage;
