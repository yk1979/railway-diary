import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavorite } from '../store'

const MovieItem = (props) => {
  const dispatch = useDispatch();

  return (
    <li>
      {props.movie.name}
      <button>watched</button>
      <button onClick={() => dispatch(toggleFavorite(props.movie.id))}>favorite</button>
    </li>
  )

}

export default MovieItem;