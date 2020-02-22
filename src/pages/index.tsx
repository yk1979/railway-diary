import React from "react";
import { NextPage } from "next";
import AddMovie from "../components/AddMovie";
import Layout from "../components/Layout";
// import NavButton from "../components/NavButton";

const Index: NextPage = () => (
  <Layout>
    {/* <NavButton link="/favorite" text="favorite" />
    <NavButton link="/watched" text="watched" /> */}
    <AddMovie />
  </Layout>
);

export default Index;
