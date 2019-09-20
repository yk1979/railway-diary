import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleFavorite, toggleWatched } from '../store'
import { MdCheck, MdFavoriteBorder } from 'react-icons/md'
import styled from 'styled-components';

const ListItem = styled.li`
  margin-top: 8px;
  font-size: 1.6rem;
  line-height: 1.6;
`

const Button = styled.button`
  margin-left: 8px;
  padding: 2px 4px;
  background-color: #DCEEF2;
  border: 1px solid #B8D3D9;
  border-radius: 4px;
  cursor: pointer;
`

const MovieItem = (props) => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      {props.movie.name}
      <Button onClick={() => dispatch(toggleWatched(props.movie.id))}>
        <MdCheck
          size={16}
          color="#8AA6A6"
        />
      </Button>
      <Button onClick={() => dispatch(toggleFavorite(props.movie.id))}>
        <MdFavoriteBorder
          size={16}
          color="#8AA6A6"
        />
      </Button>
    </ListItem>
  )

}

export default MovieItem;