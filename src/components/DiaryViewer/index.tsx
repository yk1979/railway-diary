import React from "react";
import styled from "styled-components";

import BreakPoint from "../../constants/BreakPoint";
import { Diary } from "../../store/diary/types";
import Button, { buttonTheme } from "../Button";
import DiaryController from "../DiaryController";

const Title = styled.div`
  font-weight: bold;
  font-size: 3.2rem;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  @media (min-width: ${BreakPoint.Large}px) {
    flex-direction: row;
  }
`;

const ImgWrapper = styled.div`
  flex: 1 1 200px;

  & + & {
    margin-top: 8px;

    @media (min-width: ${BreakPoint.Large}px) {
      margin: 0 0 0 8px;
    }
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
  diary: Diary;
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
      {diary.imageUrls?.length && (
        <ImgContainer>
          {diary.imageUrls.map((image, i) => (
            <ImgWrapper key={i}>
              <img src={image} />
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
