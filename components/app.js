import { useSelector } from 'react-redux'
import AddMovie from './addMovie';
import MovieList from './movieList';

function App () {
  const moviesSelector = state => state.movies;
  const movies = useSelector(moviesSelector);

  return (
    <div>
      Hello World
      <AddMovie/>
      {movies.name}
      <MovieList
        movies={movies}
      >
      </MovieList>
    </div>
  )
}

export default App;