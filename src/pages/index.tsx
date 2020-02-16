import React from "react";
import AddMovie from "../components/AddMovie";
import Layout from "../components/Layout";
import NavButton from "../components/NavButton";

const Index = () => (
  <Layout>
    <NavButton link="/favorite" text="favorite" />
    <NavButton link="/watched" text="watched" />
    <AddMovie />
  </Layout>
);

export default Index;
