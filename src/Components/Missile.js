import React from 'react'
import './Missile.scss'

const Missile = ({
  missile,
}) => {
  return(
    <div
      className="missile"
      style={{
        left: missile.coordinates[0],
        top: missile.coordinates[1],
        transform:`rotate(${missile.rotation}deg)`
      }}
    ></div>
  )
}

export default Missile
