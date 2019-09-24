import React from 'react'
import AddMovie from '../components/addMovie';
import MovieList from '../components/movieList';
import Link from 'next/link'
import {Inner, Wrapper, Title} from '../styles/common'
import styled from 'styled-components';

const PageLink = styled.a`
  display: inline-block;
  height: 30px;
  margin-bottom: 12px;
  padding: 0 12px;
  background-color: #ddd;
  border-radius: 6px;
  color: #333;
  font-size: 1.8rem;
  line-height: 30px;
  &:hover {
    text-decoration: none;
  }
  & + & {
    margin-left: 8px;
  }
`

const Index = () => (
  <>
    <Title><Inner>Movie Stocker</Inner></Title>
    <Inner>
      <Wrapper>
        <Link href="favorite"><PageLink>favorite</PageLink></Link>
        <Link href="watched"><PageLink>watched</PageLink></Link>
        <AddMovie/>
        <MovieList
          filter="all"
        />
      </Wrapper>
    </Inner>
  </>
)
export default Index;