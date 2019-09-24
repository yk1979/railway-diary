import React from 'react'
import MovieList from '../components/movieList';
import {Inner, Wrapper, Title} from '../styles/common'

const Watched = () => (
  <>
    <Title><Inner>Movie Stocker</Inner></Title>
    <Inner>
      <Wrapper>
        <MovieList
          filter="watched"
        />
      </Wrapper>
    </Inner>
  </>
)

export default Watched;