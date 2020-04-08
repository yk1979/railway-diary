import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { RootState } from "../store";
import { createDraft } from "../store/diary/actions";

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
  const router = useRouter();
  const dispatch = useDispatch();
  const diary = useSelector((state: RootState) => state.diary);

  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      <StyledEditForm
        diary={diary}
        onSubmit={(title, body) => {
          if (!diary) {
            dispatch(createDraft({ id: undefined, title, body }));
          } else {
            dispatch(createDraft({ id: diary.id, title, body }));
          }
          if (body.length > 0) {
            router.push("/preview");
          }
        }}
      />
    </StyledLayout>
  );
};

export default EditPage;
