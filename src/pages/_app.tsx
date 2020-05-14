import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import Color from "../constants/Color";
import rootReducer from "../store";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "corporate-logo";
    src: url("/font/corp_round_v1.ttf");
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    font-size: 62.5%;
  }

  body {
    height: 100%;
    margin: 0;
    font-weight: 400;
    font-size: 1.6rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Yu Gothic", sans-serif;
    line-height: 1.5;
    word-wrap: break-word;

    /* stylelint-disable-next-line */
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: ${Color.Text.Default};
    cursor: pointer;

    &:link,
    &:visited {
      text-decoration: none;
    }
  }

  button {
    margin: 0;
    padding: 0;
    background: none;
    border: 0;
    cursor: pointer;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-weight: 800;
  }

  #__next {
    height: auto;
    min-height: 100%;
  }
`;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Head>
        <title>てつどうダイアリー</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
