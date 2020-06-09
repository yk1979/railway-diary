import React from "react";
import styled from "styled-components";

import { Diary } from "../../store/diary/types";
import DiaryController from "../DiaryController";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 143px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const Link = styled.a`
  display: block;
  flex: 1 0 0%;
`;

const Title = styled.div`
  overflow: hidden;
  font-size: 1.6rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Body = styled.p`
  display: -webkit-box;
  flex-grow: 1;
  margin-top: 4px;
  overflow: hidden;
  font-size: 1.4rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  white-space: pre-wrap;
`;

type DiaryCardProps = {
  diary: Diary;
  url: string;
  controller?: {
    onEdit: () => void;
    onDelete: () => void;
  };
};

const DiaryCard: React.FC<DiaryCardProps> = ({ diary, url, controller }) => {
  const { title, body } = diary;

  return (
    <Root>
      <Link href={url}>
        <Title>{title}</Title>
        <Body>{body}</Body>
      </Link>
      {controller && (
        <DiaryController
          onEdit={controller.onEdit}
          onDelete={controller.onDelete}
        />
      )}
    </Root>
  );
};

export default DiaryCard;
