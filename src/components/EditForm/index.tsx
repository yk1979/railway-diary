import React, { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import styled from "styled-components";

import BreakPoint from "../../constants/BreakPoint";
import Color from "../../constants/Color";
import { Diary } from "../../store/diaries/types";
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

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  width: calc(8em + 40px);
  margin-top: 8px;
  cursor: pointer;
`;

const StyledLabelText = styled.span`
  margin-left: 8px;
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
  position: relative;
  width: 25%;
  padding-top: 25%;

  & + & {
    margin-top: 8px;

    @media (min-width: ${BreakPoint.Large}px) {
      margin: 0 0 0 8px;
    }
  }

  > img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteButton = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 1;
  width: 24px;
  height: 24px;
  background: ${Color.Background.Black};
  border-radius: 50%;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 16px;
    height: 2px;
    background: ${Color.Background.Default};
    content: "";
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
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
  handleSubmit: (diary: Diary) => void;
};

type Props = EditFormProps & {
  className?: string;
};

const EditForm: React.FC<Props> = ({ className, diary, handleSubmit }) => {
  const [title, setTitle] = useState(diary?.title || "");
  const [body, setBody] = useState(diary?.body || "");
  const [imageUrls, setImageUrls] = useState(diary?.imageUrls || []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (const file of files) {
        const base64Image = await convertFileToBase64Text(file);
        setImageUrls([...imageUrls, base64Image]);
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setImageUrls(imageUrls.filter((image) => image !== imageUrls[index]));
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({
          id: diary?.id || "",
          title: diary?.title || title,
          body: diary?.body || body,
          imageUrls: diary?.imageUrls || imageUrls,
          lastEdited: diary?.lastEdited || "",
        });
      }}
      className={className}
    >
      <Title
        placeholder="日記タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor value={body} onChange={(e) => setBody(e.target.value)} />
      <StyledLabel htmlFor="file">
        <MdCameraAlt size={32} />
        <StyledLabelText>画像アップロード</StyledLabelText>
      </StyledLabel>
      <input
        type="file"
        id="file"
        name="file"
        accept="image/png, image/jpeg"
        onChange={handleInputChange}
        disabled={imageUrls.length === 3}
        hidden
      />
      {imageUrls.length > 0 && (
        <ImgContainer>
          {imageUrls.map((image, i) => (
            <ImgWrapper key={i}>
              <DeleteButton onClick={() => handleRemoveFile(i)} />
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
