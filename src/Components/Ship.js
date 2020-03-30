import React from 'react'
import  './Ship.scss'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  shipCoordinates: state.game.shipCoordinates,
})

const mapDispatchToProps = null

const Ship = ({
  shipCoordinates,
}) => {
  const [ x, y ] = shipCoordinates
  return(
    <div
      style={{ left: x, top: y, }}
      id="ship">
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Ship)
