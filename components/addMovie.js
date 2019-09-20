import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addMovie } from '../store'

const AddMovie = () => {
  const dispatch = useDispatch()
  const [text, changeText] = useState('')

  return (
    <form>
      <input
        type="text"
        onChange={e => changeText(e.target.value)}
      />
      <button
        type="button"
        onClick={() => dispatch(addMovie(text))}
      >追加
      </button>
    </form>
  )
}

export default AddMovie;