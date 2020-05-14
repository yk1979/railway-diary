import React from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import styled from "styled-components";

const Controller = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  width: 24px;
  height: 24px;

  & + & {
    margin-left: 8px;
  }
  > svg {
    font-size: 2.4rem;
  }
`;

type DiaryControllerProps = {
  onEdit: () => void;
  onDelete: () => void;
};

type Props = DiaryControllerProps & {
  className?: string;
};

const DiaryController = ({ onEdit, onDelete }: Props) => (
  <Controller>
    <ActionButton onClick={onEdit}>
      <MdModeEdit />
    </ActionButton>
    <ActionButton onClick={onDelete}>
      <MdDelete />
    </ActionButton>
  </Controller>
);

export default DiaryController;
