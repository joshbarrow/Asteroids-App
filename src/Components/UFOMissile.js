import React from 'react'
import './UFOMissile.scss'

const UFOMissile = ({
  ufoMissile
}) => {
  return(
    <div
      style={{
        top: ufoMissile.coordinates[1],
        left: ufoMissile.coordinates[0],
      }}
      className="UFOMissile"
      >missile</div>
  )
}

export default UFOMissile
