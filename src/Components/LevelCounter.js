import React from 'react'
import './LevelCounter.scss'

const LevelCounter = ({
  level
}) => {
  return(
    <div className="levelCounter">Level: { level }</div>
  )
}

export default LevelCounter
