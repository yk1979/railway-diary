import React from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import styled from "styled-components";

import { Diary } from "../../store/diary/types";

const Root = styled.div`
  height: 143px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
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
  isControllable: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const DiaryCard = ({
  diary,
  isControllable,
  onEdit,
  onDelete
}: DiaryCardProps) => {
  const { title, body } = diary;

  return (
    <>
      <Root>
        <Title>{title}</Title>
        <Body>{body}</Body>
        {isControllable && (
          <Controller>
            <ActionButton onClick={onEdit}>
              <MdModeEdit />
            </ActionButton>
            <ActionButton onClick={onDelete}>
              <MdDelete />
            </ActionButton>
          </Controller>
        )}
      </Root>
    </>
  );
};

export default DiaryCard;
