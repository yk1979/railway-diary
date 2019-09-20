import AddMovie from './addMovie';
import MovieList from './movieList';
import styled from 'styled-components';

const Inner = styled.div`
  width: 960px;
  margin: 0 auto;
`

const Wrapper = styled.div`
  padding: 40px;
`

const Title = styled.h1`
  padding: 12px;
  background-color: #8AA6A6;
  color: #FFFFFF;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 1.6;
`

const App = () => {
  return (
    <>
      <Title><Inner>Movie Stocker</Inner></Title>
      <Inner>
        <Wrapper>
          <AddMovie/>
          <MovieList/>
        </Wrapper>
      </Inner>
    </>
  )
}

export default App;