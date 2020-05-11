import React from "react";
import styled from "styled-components";

import Color from "../../constants/Color";

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const UserThumbnail = styled.img`
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const UserName = styled.p`
  margin-left: 8px;
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
  userName: string;
  thumbnail: string;
  info?: {
    text: string;
    as?: React.ElementType;
  };
};

type Props = UserProfileProps & {
  className?: string;
};

const UserProfile = ({ userName, thumbnail, info, className }: Props) => (
  <Root className={className}>
    <UserThumbnail src={thumbnail} />
    <UserName>
      {userName}
      {info && <Text as={info.as}>{info.text}</Text>}
    </UserName>
  </Root>
);

export default UserProfile;
