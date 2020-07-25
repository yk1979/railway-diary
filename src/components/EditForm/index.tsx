import React, { useState } from "react";
import styled from "styled-components";

import BreakPoint from "../../constants/BreakPoint";
import Color from "../../constants/Color";
import { Diary } from "../../store/diary/types";
import Button from "../Button";

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

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  @media (min-width: ${BreakPoint.Large}px) {
    flex-direction: row;
  }
`;

const ImgWrapper = styled.div`
  flex: 1 1 200px;

  & + & {
    margin-top: 8px;

    @media (min-width: ${BreakPoint.Large}px) {
      margin: 0 0 0 8px;
    }
  }

  > img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

type EditFormProps = {
  diary?: Diary;
  onSubmit: ({
    title,
    body,
    files,
  }: {
    title: string;
    body: string;
    files: File[];
  }) => void;
};

type Props = EditFormProps & {
  className?: string;
};

const EditForm: React.FC<Props> = ({ className, diary, onSubmit }) => {
  const [title, setTitle] = useState(diary?.title || "");
  const [body, setBody] = useState(diary?.body || "");
  const [imgs, setImgs] = useState<File[]>([]);

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, body, files: imgs });
      }}
      className={className}
    >
      <Title
        placeholder="日記タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor value={body} onChange={(e) => setBody(e.target.value)} />
      {/* TODO スタイル */}
      <label htmlFor="file">画像アップロード</label>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/png, image/jpeg"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            for (const file of files) {
              setImgs([...imgs, file]);
            }
          }
        }}
        disabled={imgs.length === 3}
      />
      {imgs.length > 0 && (
        <ImgContainer>
          {imgs.map((img, i) => (
            <ImgWrapper key={i}>
              <img src={URL.createObjectURL(img)} />
            </ImgWrapper>
          ))}
        </ImgContainer>
      )}
      <ToPreviewButton text="かくにんにすすむ" />
    </StyledForm>
  );
};

export default EditForm;
