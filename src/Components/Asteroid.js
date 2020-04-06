import React from 'react'
import "./Asteroid.scss"

const Asteroid = ({
  asteroid,

}) => {
  return(
    <div
      className={`asteroid ${asteroid.size}`}

      style={{
        left: asteroid.coordinates[0],
        top: asteroid.coordinates[1],
        transform:`rotate(${asteroid.rotation}deg)`
      }}
    ></div>

  )
}

export default Asteroid
