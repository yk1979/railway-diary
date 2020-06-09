import React from "react";
import styled from "styled-components";

import Color from "../../constants/Color";

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const UserThumbnail = styled.a`
  display: block;
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const Inner = styled.div`
  margin-left: 8px;
`;

const UserName = styled.p`
  font-size: 1.4rem;
  line-height: 1.2;
`;

const Text = styled.span`
  display: block;
  margin-top: 4px;
  color: ${Color.Text.Gray};
  font-size: 1.2rem;
`;

type UserProfileProps = {
  user: {
    uid: string;
    name: string;
  };
  thumbnail: string;
  info?: {
    text: string | Date;
    date?: string;
  };
};

type Props = UserProfileProps & {
  className?: string;
};

const UserProfile: React.FC<Props> = ({ user, thumbnail, info, className }) => (
  <Root className={className}>
    <UserThumbnail href={`/user/${user.uid}`}>
      <img src={thumbnail} alt={user.name} />
    </UserThumbnail>
    <Inner>
      <UserName>{user.name}</UserName>
      {info &&
        (info.date ? (
          <Text as="time" dateTime={info.date}>
            {info.text}
          </Text>
        ) : (
          <Text>{info.text}</Text>
        ))}
    </Inner>
  </Root>
);

export default UserProfile;
