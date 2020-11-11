import { NextPage } from "next";
import React from "react";
import styled from "styled-components";

import { handleSignIn, handleSignOut } from "../auth";
import Button, { buttonTheme } from "../components/Button";
import Layout from "../components/Layout";
import { useUser } from "../context/userContext";

const ButtonWrapper = styled.div`
  margin-top: 36px;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-top: 12px;
  }
`;

const LoginPage: NextPage = () => {
  const { user } = useUser();

  const handleAuthStatusChange = () =>
    user ? handleSignOut() : handleSignIn();

  return (
    <>
      <Layout userId={null}>
        {user && <p>{`${user.name} さん としてログインしています`}</p>}
        <ButtonWrapper>
          <StyledButton
            text={user ? "ログアウトする" : "ログインする"}
            onClick={handleAuthStatusChange}
            theme={user ? buttonTheme.back : buttonTheme.primary}
          />
          {user && (
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
                  window.location.href = `/user/${user.uid}`;
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
