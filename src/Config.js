import { haveAsteroidCoordinatesBeenTaken } from './Utils/detectCollisions'

let ASTEROID_COUNTER = 0
let UFO_COUNTER = 0

export const ASTEROID_SIZE_INDEX = {
  large: 100,
  medium: 50,
  small: 25,
}

export const asteroidsByLevel = (level = 1) => {
  let counter = 0
  const asteroids = []
  while (counter < level * 5) {
    let coordinatesUsed = true
    let randomXCoordinates, randomYCoordinates
    while (coordinatesUsed) {
       randomYCoordinates = Math.floor(Math.random() * window.innerHeight + 1)
       randomXCoordinates = Math.floor(Math.random() * window.innerWidth/4 + 1)
       coordinatesUsed = haveAsteroidCoordinatesBeenTaken([randomXCoordinates, randomYCoordinates], asteroids)
    }
    const randomRotation = Math.floor(Math.random() * 360 + 1)
    counter++
    asteroids.push({
      id: ASTEROID_COUNTER++,
      coordinates: [randomXCoordinates, randomYCoordinates],
      size: "large",
      rotation: randomRotation,
    })
  }
  return asteroids
}

export const ufosByLevel = (level = 1) => {
  let counter = 0
  let ufos = []
  while (counter < level) {
    counter++
    ufos.push({
      id: UFO_COUNTER++,
      coordinates: [0,0],
      rotation: 180,
      active: false,
      startTime: 5000,
    })
  }
  return ufos
}
