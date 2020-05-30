import { NextPage } from "next";
import { MyNextContext } from "next/dist/next-server/lib/utils";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import EditForm from "../components/EditForm";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import { wrapper } from "../store";
import { createDraft } from "../store/diary/actions";
import { Diary } from "../store/diary/types";
import { userSignIn } from "../store/user/actions";
import { User } from "../store/user/types";

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
  diary: Diary;
  user: User;
};

const EditPage: NextPage<EditPageProps> = ({ diary, user }: EditPageProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <StyledLayout userId={user ? user.uid : null}>
      <Heading.Text1 text="てつどうを記録する" as="h2" />
      {user && (
        <StyledEditForm
          diary={diary}
          onSubmit={(title, body) => {
            if (!diary) {
              dispatch(createDraft({ id: "", title, body, lastEdited: "" }));
            } else {
              dispatch(
                createDraft({
                  id: diary.id,
                  title,
                  body,
                  lastEdited: diary.lastEdited
                })
              );
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

export const getServerSideProps = wrapper.getServerSideProps(
  ({ req, store }: MyNextContext) => {
    const token = req?.session?.decodedToken;

    if (token) {
      store.dispatch(
        userSignIn({
          uid: token.uid,
          name: token.name,
          picture: token.picture
        })
      );
    }
    const { diary, user } = store.getState();

    return {
      props: {
        diary,
        user
      }
    };
  }
);

export default EditPage;
