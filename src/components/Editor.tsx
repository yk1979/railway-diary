import React, { useState } from "react";
import styled from "styled-components";
import Color from "../constants/Color";
import Button from "./Button";

// TODO マークダウンエディタに変更する
const Root = styled.textarea<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  width: 100%;
  min-height: 480px;
  padding: 8px;
  border: 1px solid ${Color.Border.Default};
`;

const Previewer = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const StyledButton = styled(Button.Primary)`
  margin-top: 24px;
`;

type Props = {
  className?: string;
};

const Editor = ({ className }: Props) => {
  const [value, changeText] = useState("");
  const [buttonText, changeButtonText] = useState("確認画面に進む");
  const [showEditor, toggleVisibility] = useState(true);

  const tmp = () => {
    changeButtonText("投稿する");
    toggleVisibility(false);
  };

  return (
    <form className={className}>
      <Root
        value={value}
        onChange={e => changeText(e.target.value)}
        isVisible={showEditor}
      />
      <Previewer isVisible={!showEditor}>{value}</Previewer>
      <StyledButton text={buttonText} onClick={() => tmp()} />
    </form>
  );
};

export default Editor;
