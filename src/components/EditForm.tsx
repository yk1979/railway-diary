import React, { useState } from "react";
import styled from "styled-components";
import Color from "../constants/Color";
import Button from "./Button";
import Previewer from "./Previewer";

// TODO マークダウンエディタに変更する
const Editor = styled.textarea<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  width: 100%;
  min-height: 480px;
  padding: 8px;
  font-size: 1.6rem;
  border: 1px solid ${Color.Border.Default};
`;

const StyledButton = styled(Button.Primary)`
  margin-top: 24px;
`;

type Props = {
  className?: string;
};

const EditForm = ({ className }: Props) => {
  const [value, changeText] = useState("");
  const [showEditor, toggleEditorVisibility] = useState(true);

  return (
    <form className={className}>
      {showEditor ? (
        <>
          <Editor
            value={value}
            onChange={e => changeText(e.target.value)}
            isVisible={showEditor}
          />
          <StyledButton
            text="確認画面に進む"
            onClick={() => toggleEditorVisibility(false)}
          />
        </>
      ) : (
        <Previewer isVisible={!showEditor} text={value} />
      )}
    </form>
  );
};

export default EditForm;
