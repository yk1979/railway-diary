import { MyNextContext } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import firebase from "../../firebase";
import { handleSignIn, handleSignOut } from "../auth";
import Button, { buttonTheme } from "../components/Button";
import Layout from "../components/Layout";
import { RootState } from "../store";
import { userSignIn, userSignOut } from "../store/user/actions";

const Text = styled.p`
  margin-top: 24px;
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
`;

type LoginPageProps = {
  userData: {
    uid: string;
    name: string;
  };
};

const LoginPage = ({ userData }: LoginPageProps) => {
  const dispatch = useDispatch();

  const signedInUser =
    useSelector((state: RootState) => state.user) || userData;

  useEffect(() => {
    if (userData) {
      dispatch(userSignIn(userData));
    }

    firebase.auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        await fetch("/api/login", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ token })
        });
        dispatch(
          userSignIn({
            uid: currentUser.uid,
            name: currentUser.displayName
          })
        );
        // TODO ログイン後は元いたページに戻したい
      } else {
        await fetch("/api/logout", {
          method: "POST",
          credentials: "same-origin"
        });
        dispatch(userSignOut());
      }
    });
  }, []);

  return (
    <>
      <Layout userId={null}>
        {signedInUser && (
          <Text>{`${signedInUser.name} さん としてログインしています`}</Text>
        )}
        {/* TODO ログアウト後レンダーが走らない問題に対処 */}
        {/* 他のページから遷移してきた場合に再レンダリングが無効になる */}
        <StyledButton
          text={!signedInUser ? "ログインする" : "ログアウトする"}
          onClick={!signedInUser ? handleSignIn : handleSignOut}
          theme={!signedInUser ? buttonTheme.primary : buttonTheme.back}
        />
        {signedInUser && (
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
                window.location.href = `/user/${signedInUser.uid}`;
              }}
            />
          </>
        )}
      </Layout>
    </>
  );
};

LoginPage.getInitialProps = ({ req }: MyNextContext) => {
  const token = req?.session?.decodedToken;

  const userData = token
    ? {
        uid: token.uid,
        name: token.name
      }
    : null;

  return {
    userData
  };
};

export default LoginPage;
