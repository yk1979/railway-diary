import AddMovie from './addMovie';
import MovieList from './movieList';
import Link from 'next/link'
import {Inner, Wrapper, Title} from '../styles/common'
import styled from 'styled-components';

const FavLink = styled.a`
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
`

const App = () => {
  return (
    <>
      <Title><Inner>Movie Stocker</Inner></Title>
      <Inner>
        <Wrapper>
          <Link href="favorite"><FavLink>favorite</FavLink></Link>
          <AddMovie/>
          <MovieList
            filter="all"
          />
        </Wrapper>
      </Inner>
    </>
  )
}

export default App;