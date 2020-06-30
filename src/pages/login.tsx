import { NextPage } from "next";
import { MyNextContext } from "next-redux-wrapper";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import firebase from "../../firebase";
import { handleSignIn, handleSignOut } from "../auth";
import Button, { buttonTheme } from "../components/Button";
import Layout from "../components/Layout";
import { RootState, wrapper } from "../store";
import { userSignIn, userSignOut } from "../store/user/actions";
import { User, UserState } from "../store/user/types";

const Text = styled.p`
  margin-top: 24px;
`;

const StyledButton = styled(Button)`
  margin-top: 24px;
`;

type LoginPageProps = {
  user: User;
};

const LoginPage: NextPage<LoginPageProps> = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, UserState>((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        await fetch("/api/login", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ token }),
        });
        dispatch(
          userSignIn({
            uid: currentUser.uid,
            name: currentUser.displayName,
            picture: currentUser.photoURL || "",
          })
        );
        // TODO ログイン後は元いたページに戻したい
      } else {
        await fetch("/api/logout", {
          method: "POST",
          credentials: "same-origin",
        });
        dispatch(userSignOut());
      }
    });
  }, []);

  return (
    <>
      <Layout userId={null}>
        {user && <Text>{`${user.name} さん としてログインしています`}</Text>}
        {/* TODO ログアウト後レンダーが走らない問題に対処 */}
        {/* 他のページから遷移してきた場合に再レンダリングが無効になる */}
        <StyledButton
          text={!user ? "ログインする" : "ログアウトする"}
          onClick={!user ? handleSignIn : handleSignOut}
          theme={!user ? buttonTheme.primary : buttonTheme.back}
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
      </Layout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  ({ req, store }: MyNextContext) => {
    const token = req?.session?.decodedToken;

    if (token) {
      store.dispatch(
        userSignIn({
          uid: token.uid,
          name: token.name,
          picture: token.picture,
        })
      );
    }
  }
);

export default LoginPage;
