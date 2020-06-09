import React from "react";
import styled from "styled-components";

import { Diary } from "../../store/diary/types";
import Button, { buttonTheme } from "../Button";
import DiaryController from "../DiaryController";

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
  diary: Omit<Diary, "lastEdited">;
  buttons?: {
    onSave: () => Promise<void>;
    onBack: () => void;
  };
  controller?: {
    onEdit: () => void;
    onDelete: () => void;
  };
};

type Props = PreviewProps & {
  className?: string;
};

const DiaryViewer: React.FC<Props> = ({
  diary,
  buttons,
  controller,
  className,
}) => {
  return (
    <div className={className}>
      <Title>
        {diary.title}
        {controller && (
          <DiaryController
            onEdit={controller.onEdit}
            onDelete={controller.onDelete}
          />
        )}
      </Title>
      <Body>{diary.body}</Body>
      {buttons && (
        <>
          <SubmitButton
            text="きろくする"
            onClick={(e: Event) => {
              e.preventDefault();
              buttons.onSave();
            }}
          />
          <BackButton
            text="もどる"
            onClick={(e: Event) => {
              e.preventDefault();
              buttons.onBack();
            }}
            theme={buttonTheme.back}
          />
        </>
      )}
    </div>
  );
};

export default DiaryViewer;
