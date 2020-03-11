import React from "react";
import styled from "styled-components";

import Button, { buttonTheme } from "./Button";

const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

const BackButton = styled(Button)`
  margin-top: 16px;
`;

type PreviewerProps = {
  text: string;
  backButtonAction: any;
};

const Previewer = ({ text, backButtonAction }: PreviewerProps) => {
  return (
    <>
      <div>{text}</div>
      <SubmitButton text="投稿する" />
      <BackButton
        text="戻る"
        backButtonAction={backButtonAction}
        theme={buttonTheme.back}
      />
    </>
  );
};

export default Previewer;
