import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

import { handleSignIn, handleSignOut } from "../auth";
import Button, { buttonTheme } from "../components/Button";
import Layout from "../components/Layout";
import { useAuthUser } from "../context/userContext";

const ButtonWrapper = styled.div`
  margin-top: 36px;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-top: 12px;
  }
`;

const LoginPage: NextPage = () => {
  const { authUser } = useAuthUser();

  const handleAuthStatusChange = () =>
    authUser ? handleSignOut() : handleSignIn();

  return (
    <>
      <Layout>
        {authUser && <p>{`${authUser.name} さん としてログインしています`}</p>}
        <ButtonWrapper>
          <StyledButton
            text={authUser ? "ログアウトする" : "ログインする"}
            onClick={handleAuthStatusChange}
            theme={authUser ? buttonTheme.back : buttonTheme.primary}
          />
          {authUser && (
            <>
              <StyledButton
                text="トップへ"
                onClick={() => {
                  window.location.href = "/";
                }}
              />
              <StyledButton
                text="あなたの てつどうのきろく をみる"
                onClick={() => {
                  window.location.href = `/user/${authUser.id}`;
                }}
              />
            </>
          )}
        </ButtonWrapper>
      </Layout>
    </>
  );
};

export default LoginPage;
