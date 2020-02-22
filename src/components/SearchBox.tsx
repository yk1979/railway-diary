import React from "react";
import styled from "styled-components";
import Color from "../constants/Color";

const TextInput = styled.input`
  width: 100%;
  min-height: 40px;
  padding: 4px 16px;
  font-size: 1.6rem;
  border: 1px solid ${Color.Border.Default};
  border-radius: 6px;
  appearance: none;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 8px;
  padding: 0 16px;
  color: ${Color.Text.White};
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 40px;
  background-color: ${Color.Button.Default};
  border: none;
  border-radius: 6px;
`;

const AddMovie = () => (
  <form>
    <TextInput type="text" placeholder="駅名や路線名で検索できます" />
    <Button type="button">検索</Button>
  </form>
);

export default AddMovie;
