import { useRouter } from "next/router";
import React from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { toggleEditing } from "../store/diary/actions";
import { Diary } from "../store/diary/types";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 343px;
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

type DiaryItemType = {
  diary: Diary;
};

const DiaryItem = ({ diary }: DiaryItemType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Root>
      <Title>{diary.title}</Title>
      <Body>{diary.body}</Body>
      <Controller>
        <ActionButton
          onClick={e => {
            e.preventDefault();
            dispatch(toggleEditing(diary.id));
            // router.push("/edit");
          }}
        >
          <MdModeEdit />
        </ActionButton>
        <ActionButton>
          <MdDelete />
        </ActionButton>
      </Controller>
    </Root>
  );
};

export default DiaryItem;
