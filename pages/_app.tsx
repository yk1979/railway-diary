import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import withReduxStore from "../lib/with-redux-store";
import GlobalStyle from "../styles/base";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
