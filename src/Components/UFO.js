import React from 'react'
import './UFO.scss'

const UFO = ({
  ufo
}) => {
  return(
    <div
      style= {{
        left: ufo.coordinates[0],
        top: ufo.coordinates[1],
        
      }}
      className="ufo">ufo</div>
  )
}
export default UFO
