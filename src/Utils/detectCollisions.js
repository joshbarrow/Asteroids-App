import createAsteroidsFromCollision from './createAsteroidsFromCollision'
import { ASTEROID_SIZE_INDEX } from '../Config'


function detectCollisions(collectionA, collectionB, onDetect) {
  const itemACollisions = []
  const itemBCollisions = []

  collectionA.forEach((itemA) => {
    collectionB.forEach((itemB) => {
      if (
        itemA.coordinates[0] >= itemB.coordinates[0] &&
        itemA.coordinates[0] <= itemB.coordinates[0]+ASTEROID_SIZE_INDEX[itemB.size] &&
        itemA.coordinates[1] >= itemB.coordinates[1] &&
        itemA.coordinates[1] <= itemB.coordinates[1]+ASTEROID_SIZE_INDEX[itemB.size]
      ) {
        if (typeof onDetect === "function") {
          onDetect(itemA, itemB)
        }
        itemACollisions.push(itemA.id)
        itemBCollisions.push(itemB.id)

      }
    } )
  } )
  return { collectionA: itemACollisions, collectionB: itemBCollisions }
}

function calculatePointsFromCollision(size) {
  if (size === "large") {
    return 30
  } else if (size === "medium") {
    return 20
  } else if (size === "small") {
    return 10
  }
}

export function detectMissileCollisions(missiles, asteroids) {
  const newAsteroids = []
  let points = 0
  const collisions = detectCollisions(missiles, asteroids, (missile, asteroid) => {
    points = points+calculatePointsFromCollision(asteroid.size)
    createAsteroidsFromCollision(asteroid)
      .forEach((newAsteroid) => {
        newAsteroids.push(newAsteroid)
      })
  })
  return {
    asteroid: collisions.collectionB,
    missile: collisions.collectionA,
    newAsteroids,
    points,
  }
}

export function detectShipCollisions(shipCoordinates, asteroids) {
  const newAsteroids = []
  const collisions = detectCollisions([{ id: "ship", coordinates: shipCoordinates }], asteroids, (ship, asteroid) => {
    createAsteroidsFromCollision(asteroid)
      .forEach((newAsteroid) => {
        newAsteroids.push(newAsteroid)
      })
  })
  return {
    shipDidCollide: !!collisions.collectionA.length,
    asteroid: collisions.collectionB,
    newAsteroids,
  }
}
