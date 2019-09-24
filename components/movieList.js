import React from 'react';
import { useSelector } from 'react-redux';
import MovieItem from './movieitem';

const MovieList = ({filter}) => {
  const moviesSelector = state => state.movies;
  const movies = useSelector(moviesSelector);

  const setFilter = (movies, filter) => {
    switch(filter) {
      case 'all':
        return movies;
      case 'favorite':
        return movies.filter(movie => movie.favorite)
      case 'watched':
        return movies.filter(movie => movie.watched)
    }
  }
  const filteredMovies = setFilter(movies, filter)

  return (
    <ul>
      {filteredMovies.map(movie => (
        <MovieItem
          movie={movie}
          key={movie.id}
          favorite={movie.favorite}
          watched={movie.watched}
        />
      ))}
    </ul>
  )
}

export default MovieList;