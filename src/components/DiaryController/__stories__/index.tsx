// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";

import DiaryController from "..";

export default {
  title: "DiaryController"
};

export const Default = () => {
  return <DiaryController onEdit={async () => {}} onDelete={() => {}} />;
};
