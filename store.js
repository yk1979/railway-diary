import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'

const logger = createLogger({
  diff: true,
});

const exampleInitialState = {
  count: 0,
  movies: []
}

export const actionTypes = {
  ADD: 'ADD',
  FAVORITE: 'FAVORITE',
  WATCHED: 'WATCHED'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: state.movies.length + 1,
            name: action.name,
            favorite: false,
            watched: false
          }
        ]
      };

    case actionTypes.FAVORITE:
      return {
        ...state,
        movies:
          (state.movies).map(movie =>
          (movie.id === action.id)
            ? {...movie, favorite: !movie.favorite}
            : movie
          )
      };

    case actionTypes.WATCHED:
      return {
        ...state,
        movies:
          (state.movies).map(movie =>
          (movie.id === action.id)
            ? {...movie, watched: !movie.watched}
            : movie
          )
      };

    default:
      return state;
  }
}

// ACTIONS
export const addMovie = (name) => {
  return {type: actionTypes.ADD, name: name}
}

export const toggleFavorite = (id) => {
  return {type: actionTypes.FAVORITE, id: id}
}

export const toggleWatched = (id) => {
  return {type: actionTypes.WATCHED, id: id}
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(logger))
  )
}
