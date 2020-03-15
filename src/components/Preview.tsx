import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { toggleEditing } from "../store/diary/actions";
import { Diary, DiaryState } from "../store/diary/types";
import Button, { buttonTheme } from "./Button";

const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

const BackButton = styled(Button)`
  margin-top: 16px;
`;

const Preview = () => {
  const diary = useSelector<DiaryState, Diary | undefined>(state =>
    state.diaries.find(d => d.isEditing === true)
  );
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (diary) {
          dispatch(toggleEditing(diary.id));
          router.push("/mypage");
        }
      }}
    >
      <div>{diary ? diary.text : ""}</div>
      <SubmitButton text="投稿する" />
      <BackButton
        text="戻る"
        // buttonAction={() => setIsEditing(true)}
        theme={buttonTheme.back}
      />
    </form>
  );
};

export default Preview;
