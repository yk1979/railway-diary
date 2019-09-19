import React from 'react';
import { MovieItem } from './movieitem';

const MovieList = ({ movies }) => (
  <div>
    <ul>
      {movies.map(movie => (
        <MovieItem
          movie={movie}
          key={movie.id}
        />
      ))}
    </ul>
  </div>
)

export default MovieList;