import React from "react";

import Header from "..";

export default {
  title: "Header",
};

// TODO パターン追加
export const Default: React.FC = () => <Header userId={null} />;
export const UserIsSingedIn: React.FC = () => (
  <Header userId="dr2gvaMnQnXDpOd0m2VqmmxlVrC3" />
);
