import React from 'react'
import "./LivesCounter.scss"
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  numberOfLives: state.game.numberOfLives
})

export const LivesCounter = ({
  numberOfLives,
}) => {
  return(
    <div id="lives">Lives: { numberOfLives }</div>
  )
}

export default connect(mapStateToProps, null)(LivesCounter)
