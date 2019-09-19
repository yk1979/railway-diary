import React from 'react';

export const MovieItem = ({movie}) => (
  <li>
    {movie.name}
    <button>watched</button>
    <button>favorite</button>
  </li>
)