import React from 'react'
import './Missile.scss'

const Missile = ({
  missile,

}) => {
  return(
    <div
      style={{
        left: missile.coordinates[0],
        top: missile.coordinates[1],
        transform:`rotate(${missile.rotation}deg)`
      }}
      className="missile"
    ></div>
  )
}

export default Missile
