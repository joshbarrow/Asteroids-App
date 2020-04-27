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
  while (counter < level) {
    let coordinatesUsed = true
    let randomXCoordinates = Math.floor(Math.random() * window.innerWidth/4 + 1)
    let randomYCoordinates = Math.floor(Math.random() * window.innerHeight + 1)
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
