import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addMovie } from "../store";

const TextInput = styled.input`
  width: 630px;
  height: 40px;
  padding: 0 16px;
  appearance: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1.6rem;
  line-height: 40px;
`;

const Button = styled.button`
  height: 40px;
  margin-left: 4px;
  padding: 0 16px;
  background-color: #bf8069;
  border-radius: 6px;
  border: none;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 40px;
`;

const AddMovie = () => {
  const dispatch = useDispatch();
  const [text, changeText] = useState("");

  return (
    <form>
      <TextInput
        type="text"
        onChange={e => changeText(e.target.value)}
        value={text}
      />
      <Button
        type="button"
        onClick={() => {
          if (text !== "") {
            dispatch(addMovie(text));
          }
          changeText("");
        }}
      >
        Search
      </Button>
    </form>
  );
};

export default AddMovie;
