import React from 'react'
import  './Ship.scss'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  shipCoordinates: state.game.shipCoordinates,
  shipRotation: state.game.shipRotation,
})

const mapDispatchToProps = null

const Ship = ({
  shipCoordinates,
  shipRotation,
}) => {
  const [ x, y ] = shipCoordinates
  return(
    <div
      style={{
        left: x,
        top: y,
        transform:`rotate(${shipRotation}deg)`
      }}
      id="ship">
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Ship)
