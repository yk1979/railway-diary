import React from "react";
import styled from "styled-components";
import Button from "./Button";

const SubmitButton = styled(Button.Primary)`
  margin-top: 24px;
`;

const BackButton = styled(Button.Back)`
  margin-top: 16px;
`;

type PreviewerProps = {
  isVisible: boolean;
  text: string;
};

const Previewer = ({ text }: PreviewerProps) => {
  return (
    <>
      <div>{text}</div>
      <SubmitButton text="投稿する" />
      <BackButton text="戻る" href="/" />
    </>
  );
};

export default Previewer;
