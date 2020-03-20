import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Color from "../constants/Color";
import { createDraft } from "../store/diary/actions";
import { Diary } from "../store/diary/types";
import Button from "./Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1.6rem;
  line-height: 1.5;
  border: 1px solid ${Color.Border.Default};
  appearance: none;
`;

// TODO マークダウンエディタに変更する
const Editor = styled.textarea`
  display: block;
  flex-grow: 1;
  width: 100%;
  margin-top: 16px;
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
  const [title, setTitle] = useState(diary ? diary.title : "");
  const [body, setBody] = useState(diary ? diary.body : "");

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <StyledForm
      onSubmit={e => {
        e.preventDefault();
        if (!diary) {
          dispatch(createDraft(title, body));
        }
        if (body.length > 0) {
          router.push("/preview");
        }
      }}
      className={className}
    >
      <Title
        placeholder="日記タイトル"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Editor value={body} onChange={e => setBody(e.target.value)} />
      <ToPreviewButton text="かくにんにすすむ" />
    </StyledForm>
  );
};

export default EditForm;
