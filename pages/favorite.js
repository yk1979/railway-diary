import React from 'react'
import MovieList from '../components/movieList';
import {Inner, Wrapper, Title} from '../styles/common'

const Favorite = () => (
  <>
    <Title><Inner>Movie Stocker</Inner></Title>
    <Inner>
      <Wrapper>
        <MovieList
          filter="favorite"
        />
      </Wrapper>
    </Inner>
  </>
)

export default Favorite;