import React from 'react'
import { useDispatch } from 'react-redux'

const NextLevel = () => {
  const dispatch = useDispatch()
  return(
    <div className="next">Next Level
      <button
        onClick={ () => {
          dispatch({
            type: "NEW_GAME",
            payload: null,
          })
        }}
      >Next Level
      </button>
    </div>
  )
}

export default NextLevel
