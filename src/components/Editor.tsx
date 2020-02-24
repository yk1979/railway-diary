import React, { useState } from "react";
import styled from "styled-components";
import Color from "../constants/Color";
import Button from "./Button";

// TODO マークダウンエディタに変更する
const Root = styled.textarea`
  display: block;
  width: 100%;
  min-height: 480px;
  padding: 8px;
  border: 1px solid ${Color.Border.Default};
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

  return (
    <form className={className}>
      <Root value={value} onChange={e => changeText(e.target.value)} />
      <StyledButton
        text={buttonText}
        onClick={() => changeButtonText("投稿する")}
      />
    </form>
  );
};

export default Editor;
