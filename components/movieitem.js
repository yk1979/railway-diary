import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavorite, toggleWatched } from '../store'

const MovieItem = (props) => {
  const dispatch = useDispatch();

  return (
    <li>
      {props.movie.name}
      <button onClick={() => dispatch(toggleWatched(props.movie.id))}>watched</button>
      <button onClick={() => dispatch(toggleFavorite(props.movie.id))}>favorite</button>
    </li>
  )

}

export default MovieItem;