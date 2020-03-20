import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { RootState } from "../store";

const StyledLayout = styled(Layout)`
  > div {
    display: flex;
    flex-direction: column;
  }
`;

const StyledEditForm = styled(EditForm)`
  flex: 1;
  margin-top: 24px;
`;

const EditPage = () => {
  const diary = useSelector((state: RootState) =>
    state.diaries.find(d => d.isEditing === true)
  );

  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      <StyledEditForm diary={diary} />
    </StyledLayout>
  );
};

export default EditPage;
