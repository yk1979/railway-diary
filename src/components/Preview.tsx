import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Color from "../constants/Color";
import { addDiary } from "../store/diary/actions";
import { Diary } from "../store/diary/types";
import Button, { buttonTheme } from "./Button";

const Title = styled.div`
  font-size: 2rem;
`;

const Body = styled.div`
  margin-top: 8px;
  padding: 8px;
  border: 1px solid ${Color.Border.Default};
`;

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
          <Title>{diary.title}</Title>
          <Body>{diary.body}</Body>
          <SubmitButton
            text="きろくする"
            onClick={(e: Event) => {
              e.preventDefault();
              if (diary) {
                dispatch(addDiary(diary));
                router.push("/mypage");
              }
            }}
          />
          <BackButton
            text="もどる"
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
