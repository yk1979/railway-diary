import React from "react";

import Header from "..";

export default {
  title: "Header",
};

// TODO context によって見た目が変わる場合は storybook どうするんだろう？
export const Default: React.FC = () => <Header />;
export const UserIsSingedIn: React.FC = () => <Header />;
