import React from 'react'
import './ScoreCounter.scss'

const Score = ({
  score
}) => {
  return(
    <div id="score">Score: { score }</div>
  )
}

export default Score
