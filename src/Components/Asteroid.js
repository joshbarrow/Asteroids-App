import React from 'react'
import "./Asteroid.scss"
import { ASTEROID_SIZE_INDEX } from '../Config'

const Asteroid = ({
  asteroid,

}) => {
  return(
    <div
      className={`asteroid ${asteroid.size}`}
      style={{
        width: ASTEROID_SIZE_INDEX[asteroid.size],
        height: ASTEROID_SIZE_INDEX[asteroid.size],
        left: asteroid.coordinates[0],
        top: asteroid.coordinates[1],
        transform:`rotate(${asteroid.rotation}deg)`
      }}
    ></div>

  )
}

export default Asteroid
