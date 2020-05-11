import React from "react";
import styled from "styled-components";

import Color from "../../constants/Color";
import { DiaryState } from "../../store/diary/types";
import Button, { buttonTheme } from "../Button";

const Title = styled.div`
  font-size: 2rem;
`;

const Body = styled.div`
  margin-top: 8px;
  padding: 8px;
  white-space: pre-wrap;
  border: 1px solid ${Color.Border.Default};
`;

const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

const BackButton = styled(Button)`
  margin-top: 16px;
`;

export type PreviewProps = {
  diary: DiaryState;
  onSave: () => Promise<void>;
  onBack: () => void;
};

const Preview = ({ diary, onSave, onBack }: PreviewProps) => {
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
              onSave();
            }}
          />
          <BackButton
            text="もどる"
            onClick={(e: Event) => {
              e.preventDefault();
              onBack();
            }}
            theme={buttonTheme.back}
          />
        </>
      ) : (
        <>
          <div>編集中の日記はありません</div>
          <BackButton
            text="日記を書く"
            onClick={(e: Event) => {
              e.preventDefault();
              onBack();
            }}
          />
        </>
      )}
    </form>
  );
};

export default Preview;
