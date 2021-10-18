import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { useAuthUser } from "../context/userContext";
import { createDraft } from "../redux/modules/diaries";
import { Diary } from "../server/services/diaries/types";

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

const CreatePage: NextPage = () => {
  const { authUser } = useAuthUser();
  if (!authUser) {
    return (
      <Layout>
        <Link href="/login">
          <a>ログインしてね</a>
        </Link>
      </Layout>
    );
  }

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (diary: Diary) => {
    dispatch(createDraft(diary));
    if (diary.body.length > 0) {
      router.push("/preview");
    }
  };

  return (
    <StyledLayout>
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      {authUser && <StyledEditForm handleSubmit={handleSubmit} />}
    </StyledLayout>
  );
};

export default CreatePage;
