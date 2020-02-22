import React from "react";
import { NextPage } from "next";
import SearchBox from "../components/SearchBox";
import Layout from "../components/Layout";
// import NavButton from "../components/NavButton";

const Index: NextPage = () => (
  <Layout>
    {/* <NavButton link="/favorite" text="favorite" />
    <NavButton link="/watched" text="watched" /> */}
    <SearchBox />
  </Layout>
);

export default Index;
