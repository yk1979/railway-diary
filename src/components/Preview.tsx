import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { addDiary } from "../store/diary/actions";
import { Diary } from "../store/diary/types";
import Button, { buttonTheme } from "./Button";

const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

const BackButton = styled(Button)`
  margin-top: 16px;
`;

export type PreviewProps = {
  diary?: Diary;
};

const Preview = ({ diary }: PreviewProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <form>
      {diary ? (
        <>
          <div>{diary.text}</div>
          <SubmitButton
            text="投稿する"
            onClick={(e: Event) => {
              e.preventDefault();
              if (diary) {
                dispatch(addDiary(diary));
                router.push("/mypage");
              }
            }}
          />
          <BackButton
            text="戻る"
            onClick={(e: Event) => {
              e.preventDefault();
              router.push("/edit");
            }}
            theme={buttonTheme.back}
          />
        </>
      ) : (
        <div>編集中の日記はありません</div>
      )}
    </form>
  );
};

export default Preview;
