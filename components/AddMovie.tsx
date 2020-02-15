import React from "react";
import styled from "styled-components";

const TextInput = styled.input`
  width: 630px;
  height: 40px;
  padding: 0 16px;
  font-size: 1.6rem;
  line-height: 40px;
  border: 1px solid #ccc;
  border-radius: 6px;
  appearance: none;
`;

const Button = styled.button`
  height: 40px;
  margin-left: 4px;
  padding: 0 16px;
  color: #fff;
  font-weight: bold;
  font-size: 1.8rem;
  line-height: 40px;
  background-color: #bf8069;
  border: none;
  border-radius: 6px;
`;

const AddMovie = () => {
  return (
    <form>
      <TextInput type="text" />
      <Button type="button">Search</Button>
    </form>
  );
};

export default AddMovie;
