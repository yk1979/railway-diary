/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

import DiaryController from "..";

export default {
  title: "DiaryController",
};

export const Default: React.FC = () => {
  return <DiaryController onEdit={async () => {}} onDelete={() => {}} />;
};
