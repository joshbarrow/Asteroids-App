import createAsteroidsFromCollision from './createAsteroidsFromCollision'

export default function detectCollisions(missiles, asteroids) {
  const missileCollisions = []
  const asteroidCollisions = []
  const newAsteroids = []
  const ASTEROID_SIZE_INDEX = {
    large: 50,
    medium: 25,
    small: 10,
  }
  missiles.forEach((missile) => {
    asteroids.forEach((asteroid) => {
      if (
        missile.coordinates[0] >= asteroid.coordinates[0] &&
        missile.coordinates[0] <= asteroid.coordinates[0]+ASTEROID_SIZE_INDEX[asteroid.size] &&
        missile.coordinates[1] >= asteroid.coordinates[1] &&
        missile.coordinates[1] <= asteroid.coordinates[1]+ASTEROID_SIZE_INDEX[asteroid.size]
      ) {
        missileCollisions.push(missile.id)
        asteroidCollisions.push(asteroid.id)
        createAsteroidsFromCollision(asteroid)
          .forEach((newAsteroid) => {
            newAsteroids.push(newAsteroid)
          })
      }
    } )
  } )
  return { missile: missileCollisions, asteroid: asteroidCollisions, newAsteroids }
}
