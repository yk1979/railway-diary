import React from "react";
import App from "next/app";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

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

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    );
  }
}
