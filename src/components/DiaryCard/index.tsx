import React from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import styled from "styled-components";

import { Diary } from "../../store/diary/types";

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

const Controller = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  width: 24px;
  height: 24px;

  & + & {
    margin-left: 8px;
  }
  > svg {
    font-size: 2.4rem;
  }
`;

type DiaryCardProps = {
  diary: Diary;
  url: string;
  controller?: {
    onEdit: () => void;
    onDelete: () => void;
  };
};

const DiaryCard = ({ diary, url, controller }: DiaryCardProps) => {
  const { title, body } = diary;

  return (
    <Root>
      <Link href={url}>
        <Title>{title}</Title>
        <Body>{body}</Body>
      </Link>
      {controller && (
        <Controller>
          <ActionButton onClick={controller.onEdit}>
            <MdModeEdit />
          </ActionButton>
          <ActionButton onClick={controller.onDelete}>
            <MdDelete />
          </ActionButton>
        </Controller>
      )}
    </Root>
  );
};

export default DiaryCard;
