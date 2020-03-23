import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

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
    >
      <button type="button" onClick={onRequestClose}>
        close
      </button>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <div>この日記を削除しますか？</div>
    </Modal>
  );
};

export default Dialogue;
