import { format } from "date-fns";
import React from "react";
import styled from "styled-components";

import Color from "../../constants/Color";
import { Diary } from "../../store/diary/types";

const Root = styled.div`
  height: 112px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
`;

const Link = styled.a<{ withThumbnail: boolean }>`
  display: ${({ withThumbnail }) => (withThumbnail ? "flex" : "block")};
`;

const Thumbnail = styled.img`
  width: 96px;
  height: 96px;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 16px;
`;

const StyledTime = styled.time`
  color: ${Color.Text.Gray};
  font-size: 1.2rem;
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
  -webkit-line-clamp: 2;
  white-space: pre-wrap;
`;

type DiaryCardProps = {
  diary: Diary;
  url: string;
};

const DiaryCard: React.FC<DiaryCardProps> = ({ diary, url }) => {
  const { title, body } = diary;
  console.log("test", diary.lastEdited, typeof diary.lastEdited);
  const formattedDate = format(new Date(), "yyyy-MM-dd");

  return (
    <Root>
      <Link href={url} withThumbnail={diary.imageUrls.length > 0}>
        <>
          {diary.imageUrls.length > 0 ? (
            <>
              <Thumbnail src={diary.imageUrls[0]} />
              <TextWrapper>
                {/* TODO dateTime */}
                <StyledTime>{formattedDate}</StyledTime>
                <Title>{title}</Title>
                <Body>{body}</Body>
              </TextWrapper>
            </>
          ) : (
            <>
              <StyledTime>{formattedDate}</StyledTime>
              <Title>{title}</Title>
              <Body>{body}</Body>
            </>
          )}
        </>
      </Link>
    </Root>
  );
};

export default DiaryCard;
