import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Color from "../constants/Color";
import { addDiary } from "../store/diary/actions";
import Button, { buttonTheme } from "./Button";

// TODO マークダウンエディタに変更する
const Editor = styled.textarea`
  width: 100%;
  min-height: 480px;
  padding: 8px;
  font-size: 1.6rem;
  border: 1px solid ${Color.Border.Default};
`;

const ToPreviewButton = styled(Button)`
  margin-top: 24px;
`;

const SubmitButton = styled(Button)`
  margin-top: 24px;
`;

const BackButton = styled(Button)`
  margin-top: 16px;
`;

type Props = {
  className?: string;
};

const EditForm = ({ className }: Props) => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const dispatch = useDispatch();

  return (
    <form action="/mypage" className={className}>
      {isEditing ? (
        <>
          <Editor value={text} onChange={e => setText(e.target.value)} />
          <ToPreviewButton
            text="確認画面に進む"
            buttonAction={() => setIsEditing(false)}
          />
        </>
      ) : (
        <>
          <div>{text}</div>
          <SubmitButton
            text="投稿する"
            buttonAction={(e: Event) => {
              e.preventDefault();
              dispatch(addDiary(text));
              // window.location.href = "/mypage";
            }}
          />
          <BackButton
            text="戻る"
            buttonAction={() => setIsEditing(true)}
            theme={buttonTheme.back}
          />
        </>
      )}
    </form>
  );
};

export default EditForm;
