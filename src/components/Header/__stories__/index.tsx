import React from "react";

import Header from "..";

export default {
  title: "Header",
};

// TODO パターン追加
export const Default = () => <Header userId={null} />;
export const UserIsSingedIn = () => (
  <Header userId="dr2gvaMnQnXDpOd0m2VqmmxlVrC3" />
);
