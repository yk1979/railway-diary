import React from "react";
import styled from "styled-components";

import Color from "../../constants/Color";
import { Diary } from "../../store/diary/types";
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
  diary: Diary;
  controller?: {
    onSave: () => Promise<void>;
    onBack: () => void;
  };
};

const DiaryViewer = ({ diary, controller }: PreviewProps) => {
  return (
    <form>
      <Title>{diary.title}</Title>
      <Body>{diary.body}</Body>
      {controller && (
        <>
          <SubmitButton
            text="きろくする"
            onClick={(e: Event) => {
              e.preventDefault();
              controller.onSave();
            }}
          />
          <BackButton
            text="もどる"
            onClick={(e: Event) => {
              e.preventDefault();
              controller.onBack();
            }}
            theme={buttonTheme.back}
          />
        </>
      )}
    </form>
  );
};

export default DiaryViewer;
