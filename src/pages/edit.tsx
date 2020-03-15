import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
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
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      <StyledEditForm diary={diary} />
    </Layout>
  );
};

export default EditPage;
