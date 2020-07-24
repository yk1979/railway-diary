import React from "react";
import styled from "styled-components";

import { Diary } from "../../store/diary/types";
import Button, { buttonTheme } from "../Button";
import DiaryController from "../DiaryController";

const Title = styled.div`
  font-weight: bold;
  font-size: 3.2rem;
`;

const ImgContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;

const ImgWrapper = styled.div`
  flex: 1 1 200px;

  & + & {
    margin-left: 8px;
  }

  > img {
    display: block;
    width: 100%;
    height: auto;
  }
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
      <Title>{diary.title}</Title>
      {controller && (
        <DiaryController
          onEdit={controller.onEdit}
          onDelete={controller.onDelete}
        />
      )}
      {diary.files?.length && (
        <ImgContainer>
          {diary.files.map((file, i) => (
            <ImgWrapper key={i}>
              <img src={URL.createObjectURL(file)} />
            </ImgWrapper>
          ))}
        </ImgContainer>
      )}
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
