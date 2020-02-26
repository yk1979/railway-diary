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
  isVisible: boolean;
  text: string;
  buttonAction: any;
};

const Previewer = ({ text, buttonAction }: PreviewerProps) => {
  return (
    <>
      <div>{text}</div>
      <SubmitButton text="投稿する" />
      <BackButton
        text="戻る"
        buttonAction={buttonAction}
        theme={buttonTheme.back}
      />
    </>
  );
};

export default Previewer;
