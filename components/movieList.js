import React from 'react';
import { useSelector } from 'react-redux';
import MovieItem from './movieitem';

const MovieList = () => {
  const moviesSelector = state => state.movies;
  const movies = useSelector(moviesSelector);

  return (
    <div>
      <ul>
        {movies.map(movie => (
          <MovieItem
            movie={movie}
            key={movie.id}
            favorite={movie.favorite}
          />
        ))}
      </ul>
    </div>
  )
}

export default MovieList;