import { GetServerSidePropsResult, NextPage } from "next";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import firebase from "../../firebase";
import { handleSignIn, handleSignOut } from "../auth";
import Button, { buttonTheme } from "../components/Button";
import Layout from "../components/Layout";
import { RootState, initializeStore } from "../store";
import {
  User,
  UserState,
  userSignIn,
  userSignOut,
} from "../store/user/reducers";
import { MyNextContext } from "../types/next";

const ButtonWrapper = styled.div`
  margin-top: 36px;
`;

const StyledButton = styled(Button)`
  & + & {
    margin-top: 12px;
  }
`;

type LoginPageProps = {
  user?: User;
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
        {user && <p>{`${user.name} さん としてログインしています`}</p>}
        {/* TODO ログアウト後レンダーが走らない問題に対処 */}
        {/* 他のページから遷移してきた場合に再レンダリングが無効になる */}
        <ButtonWrapper>
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
        </ButtonWrapper>
      </Layout>
    </>
  );
};

export const getServerSideProps = ({
  req,
}: // TODO return 型再考
MyNextContext): GetServerSidePropsResult<LoginPageProps> | void => {
  const store = initializeStore();
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
};

export default LoginPage;
