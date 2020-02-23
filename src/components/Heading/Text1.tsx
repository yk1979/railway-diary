import React from "react";
import { HeadingProps } from ".";

// TODO h2等の任意のh要素でレンダリングできるよう、propsにasを追加する
const Text1 = ({ text }: HeadingProps) => <h1>{text}</h1>;

export default Text1;
