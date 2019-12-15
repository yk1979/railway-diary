import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MdCheck, MdFavoriteBorder } from "react-icons/md";
import { toggleFavorite, toggleWatched } from "../store";

const ListItem = styled.li`
  margin-top: 8px;
  font-size: 1.6rem;
  line-height: 1.6;
`;

const Button = styled.button`
  margin-left: 8px;
  padding: 2px 4px;
  background-color: #dceef2;
  border: 1px solid #b8d3d9;
  border-radius: 4px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const MovieItem = props => {
  const dispatch = useDispatch();

  return (
    <ListItem>
      {props.movie.name}
      <Button
        css={props.movie.watched ? "background-color:#F2C1AE;" : null}
        onClick={() => dispatch(toggleWatched(props.movie.id))}
      >
        <MdCheck size={16} color="#8AA6A6" />
      </Button>
      <Button
        css={props.movie.favorite ? "background-color:#F2C1AE;" : null}
        onClick={() => dispatch(toggleFavorite(props.movie.id))}
      >
        <MdFavoriteBorder size={16} color="#8AA6A6" />
      </Button>
    </ListItem>
  );
};

export default MovieItem;
