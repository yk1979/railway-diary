import React from "react";

import UserProfile from "..";

export default {
  title: "UserProfile",
};

export const Default: React.FC = () => (
  <UserProfile
    user={{
      uid: "1",
      name: "ほげ太郎",
    }}
    thumbnail="https://lh3.googleusercontent.com/a-/AOh14GiWwulCcInWhXrrlpZmpJdobxPD_QJV9Im-mQcZ"
    info={{
      text: "テキストテキスト",
    }}
  />
);
