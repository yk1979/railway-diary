import React from "react";
import styled from "styled-components";

import Color from "../constants/Color";

export type NotifierStatus = "visible" | "hidden";

const Root = styled.div<{ status: NotifierStatus }>`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 12px 16px;
  color: ${Color.Text.White};
  text-align: center;
  background: ${Color.Primary.Blue};
  visibility: ${({ status }) => status};
`;

type PageBottomNotifierProps = {
  text: string;
  status: NotifierStatus;
};

const PageBottomNotifier = ({ text, status }: PageBottomNotifierProps) => {
  return (
    <>
      <Root id="finishDeleting" status={status}>
        {text}
        {status}
      </Root>
    </>
  );
};

export default PageBottomNotifier;
