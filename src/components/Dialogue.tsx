import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import Button, { buttonTheme } from "./Button";

Modal.setAppElement("#__next");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    position: "relative" as "relative",
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

type DialogueProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

const Dialogue = ({ isOpen, onRequestClose }: DialogueProps) => {
  return (
    <Modal
      id="test"
      contentLabel="modalA"
      closeTimeoutMS={150}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick
      style={customStyles}
    >
      <Text>この日記を削除しますか？</Text>
      <ButtonWrapper>
        <StyledButton text="削除する" />
        <StyledButton
          theme={buttonTheme.back}
          text="やめる"
          onClick={onRequestClose}
        />
      </ButtonWrapper>
    </Modal>
  );
};

export default Dialogue;
