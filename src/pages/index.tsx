import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Header from "../components/Header";
import AddMovie from "../components/AddMovie";
import { Inner, Wrapper } from "../../styles/common";

const PageLink = styled.a`
  display: inline-block;
  height: 30px;
  margin-bottom: 12px;
  padding: 0 12px;
  color: #333;
  font-size: 1.8rem;
  line-height: 30px;
  background-color: #ddd;
  border-radius: 6px;

  &:hover {
    text-decoration: none;
  }

  & + & {
    margin-left: 8px;
  }
`;

const Index = () => (
  <>
    <Header />
    <Inner>
      <Wrapper>
        <Link href="favorite">
          <PageLink>favorite</PageLink>
        </Link>
        <Link href="watched">
          <PageLink>watched</PageLink>
        </Link>
        <AddMovie />
      </Wrapper>
    </Inner>
  </>
);

export default Index;
