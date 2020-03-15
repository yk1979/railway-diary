import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Color from "../constants/Color";
import { createDraft } from "../store/diary/actions";
import { Diary } from "../store/diary/types";
import Button from "./Button";

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

type EditFormProps = {
  diary?: Diary;
};

type Props = EditFormProps & {
  className?: string;
};

const EditForm = ({ className, diary }: Props) => {
  const [text, setText] = useState(diary ? diary.text : "");

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!diary) {
          dispatch(createDraft(text));
        }
        router.push("/preview");
      }}
      className={className}
    >
      <Editor value={text} onChange={e => setText(e.target.value)} />
      <ToPreviewButton text="確認画面に進む" />
    </form>
  );
};

export default EditForm;
