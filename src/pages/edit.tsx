import { MyNextContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { RootState } from "../store";
import { createDraft } from "../store/diary/actions";
import { userSignIn } from "../store/user/actions";
import { UserState } from "../store/user/types";

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

type EditPageProps = {
  userData: UserState;
};

const EditPage: NextPage<EditPageProps> = ({ userData }: EditPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const diary = useSelector((state: RootState) => state.diary);

  const user = useSelector((state: RootState) => state.user) || userData;

  useEffect(() => {
    if (userData) {
      dispatch(userSignIn(userData));
    }
  }, []);

  return (
    <StyledLayout userId={user ? user.uid : null}>
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      {user && (
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
      )}
    </StyledLayout>
  );
};

EditPage.getInitialProps = async ({ req }: MyNextContext) => {
  const token = req?.session?.decodedToken;
  const userData: UserState = token
    ? {
        uid: token.uid,
        name: token.name
      }
    : null;

  return {
    userData
  };
};

export default EditPage;
