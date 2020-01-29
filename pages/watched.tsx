import React from "react";
import Header from "../components/Header";
import MovieList from "../components/movieList";
import { Inner, Wrapper } from "../styles/common";

const Watched = () => (
  <>
    <Header />
    <Inner>
      <Wrapper>
        <MovieList filter="watched" />
      </Wrapper>
    </Inner>
  </>
);

export default Watched;
