const UFO_MOVEMENT = 20

export function randomNumberIsOne(max = 2) {
  return Math.floor(Math.random() * max) === 1
}

export function getNewUFOState() {
  const verticalDirection = randomNumberIsOne() ?
    "up" :
    "down"

  const horizontalDirection = randomNumberIsOne(6) ?
    "left" :
    "right"

  const horizontalIncrementAmount = horizontalDirection === "right" ?
    UFO_MOVEMENT :
    UFO_MOVEMENT * -1

  const verticalIncrementAmount = verticalDirection === "down" ?
    UFO_MOVEMENT :
    UFO_MOVEMENT * -1

  const fireMissile = randomNumberIsOne(6)

  return { horizontalIncrementAmount, verticalIncrementAmount, fireMissile }
}
