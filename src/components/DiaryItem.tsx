import React from "react";
import styled from "styled-components";

import { Diary } from "../store/diary/types";

const Root = styled.div`
  width: 343px;
  height: 95px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  overflow: hidden;
  font-size: 1.4rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Body = styled.p`
  display: -webkit-box;
  margin-top: 4px;
  overflow: hidden;
  font-size: 1.2rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

type DiaryItemType = {
  diary: Diary;
};

const DiaryItem = ({ diary }: DiaryItemType) => (
  <Root>
    <Title>{diary.title}</Title>
    <Body>{diary.body}</Body>
  </Root>
);

export default DiaryItem;
