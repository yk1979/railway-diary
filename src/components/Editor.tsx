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

const SubmitButton = styled(Button.Primary)`
  margin-top: 24px;
`;

type Props = {
  className?: string;
};

const Editor = ({ className }: Props) => {
  const [value, changeText] = useState("");

  return (
    <form className={className}>
      <Root value={value} onChange={e => changeText(e.target.value)} />
      <SubmitButton text="投稿確認画面に進む" />
    </form>
  );
};

export default Editor;
