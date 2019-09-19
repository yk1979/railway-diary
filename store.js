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
  ADD: 'ADD'
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
            name: action.name
          }
        ]
      }

    default:
      return state
  }
}

// ACTIONS
export const addMovie = (name) => {
  return {type: actionTypes.ADD, name: name}
}


export function initializeStore (initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(logger))
  )
}
