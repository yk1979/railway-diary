import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Color from "../constants/Color";
import { addDiary } from "../store/diary/actions";
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

type Props = {
  className?: string;
};

const EditForm = ({ className }: Props) => {
  // const diary = useSelector<DiaryState, Diary | undefined>(state =>
  //   state.diaries.find(d => d.isEditing === true)
  // );
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch(addDiary(text));
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
