import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

import Button, { buttonTheme } from "../Button";

Modal.setAppElement("#__next");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    position: "relative" as const,
    top: "50%",
    right: "auto",
    bottom: "auto",
    left: "50%",
    width: "300px",
    height: "auto",
    padding: "16px",
    transform: "translate(-50%, -50%)"
  }
};

const Text = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  width: 45%;
`;

type ConfirmDeleteProps = {
  id: string;
  isOpen: boolean;
  onRequestClose: () => void;
  onAfterClose: () => void;
  onDelete: () => void;
};

const ConfirmDelete = ({
  id,
  isOpen,
  onRequestClose,
  onAfterClose,
  onDelete
}: ConfirmDeleteProps) => {
  const [deleteFlag, setDeleteFlag] = useState(false);
  return (
    <Modal
      id={id}
      closeTimeoutMS={150}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterClose={() => {
        if (deleteFlag) onAfterClose();
      }}
      shouldCloseOnOverlayClick
      style={customStyles}
    >
      <Text>この日記を削除しますか？</Text>
      <ButtonWrapper>
        <StyledButton
          text="削除する"
          onClick={() => {
            onDelete();
            setDeleteFlag(true);
            onRequestClose();
          }}
        />
        <StyledButton
          theme={buttonTheme.back}
          text="やめる"
          onClick={onRequestClose}
        />
      </ButtonWrapper>
    </Modal>
  );
};

export default ConfirmDelete;
