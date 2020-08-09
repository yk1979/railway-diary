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

const convertFileToBase64Text = (file: File): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reject(reader.result as string);
    };
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
};

type EditFormProps = {
  diary?: Diary;
  onSubmit: ({
    title,
    body,
    images,
  }: {
    title: string;
    body: string;
    images: string[];
  }) => void;
};

type Props = EditFormProps & {
  className?: string;
};

const EditForm: React.FC<Props> = ({ className, diary, onSubmit }) => {
  const [title, setTitle] = useState(diary?.title || "");
  const [body, setBody] = useState(diary?.body || "");
  const [images, setImages] = useState(diary?.imageUrls || []);

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, body, images });
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
        onChange={async (e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            for (const file of files) {
              const base64Image = await convertFileToBase64Text(file);
              setImages([...images, base64Image]);
            }
          }
        }}
        disabled={images.length === 3}
      />
      {images.length > 0 && (
        <ImgContainer>
          {images.map((image, i) => (
            <ImgWrapper key={i}>
              <img src={image} />
            </ImgWrapper>
          ))}
        </ImgContainer>
      )}
      <ToPreviewButton text="かくにんにすすむ" />
    </StyledForm>
  );
};

export default EditForm;
