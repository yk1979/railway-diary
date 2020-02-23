import React from "react";
import styled from "styled-components";
import Color from "../constants/Color";

// TODO マークダウンエディタに変更する
const Root = styled.textarea`
  display: block;
  width: 100%;
  min-height: 480px;
  padding: 8px;
  border: 1px solid ${Color.Border.Default};
`;

type Props = {
  className?: string;
};

const Editor = ({ className }: Props) => <Root className={className} />;

export default Editor;
