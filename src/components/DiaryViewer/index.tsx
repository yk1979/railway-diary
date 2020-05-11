import React from "react";
import styled from "styled-components";

import { Diary } from "../../store/diary/types";
import Button, { buttonTheme } from "../Button";

const Title = styled.div`
  font-weight: bold;
  font-size: 3.2rem;
`;

const Body = styled.div`
  margin-top: 16px;
  white-space: pre-wrap;
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

type Props = PreviewProps & {
  className?: string;
};

const DiaryViewer = ({ diary, controller, className }: Props) => {
  return (
    <div className={className}>
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
    </div>
  );
};

export default DiaryViewer;
