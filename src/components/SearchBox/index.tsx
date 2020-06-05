import React from "react";
import styled from "styled-components";

import Color from "../../constants/Color";
import Button from "../Button";

const TextInput = styled.input`
  width: 100%;
  min-height: 40px;
  padding: 4px 16px;
  font-size: 1.6rem;
  border: 1px solid ${Color.Border.Default};
  border-radius: 6px;
  appearance: none;
`;

const SearchButton = styled(Button)`
  margin-top: 8px;
`;

const SearchBox: React.FC = () => (
  <form>
    <TextInput
      type="text"
      placeholder="駅名や路線名で検索できるようになる予定ですが、当面工事中です"
      aria-label="駅名や路線名で検索できるようになる予定ですが、当面工事中です"
    />
    <SearchButton text="けんさく" aria-label="検索" />
  </form>
);

export default SearchBox;
