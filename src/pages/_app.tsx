import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import rootReducer from "../store";

const GlobalStyle = createGlobalStyle`
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
    font-size: 1.6rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", "Noto Sans CJK JP", "Yu Gothic", sans-serif;
    line-height: 1.5;
    word-wrap: break-word;

    /* stylelint-disable-next-line */
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;

    > div {
      height: 100%;
    }
  }

  a {
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

  #root {
    font-size: 1.6rem;
  }
`;

const store = createStore(rootReducer, composeWithDevTools());

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
