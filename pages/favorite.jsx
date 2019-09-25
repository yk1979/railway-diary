import React from 'react';
import Header from '../components/header';
import MovieList from '../components/movieList';
import { Inner, Wrapper } from '../styles/common';

const Favorite = () => (
  <>
    <Header />
    <Inner>
      <Wrapper>
        <MovieList
          filter="favorite"
        />
      </Wrapper>
    </Inner>
  </>
);

export default Favorite;
