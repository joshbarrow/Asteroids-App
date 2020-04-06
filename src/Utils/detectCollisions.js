export default function detectCollisions(missiles, asteroids) {
  const missileCollisions = []
  const asteroidCollisions = []
  const newAsteroids = []
  let ASTEROID_COUNTER = 100
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
        const a = [
          {
            id: ASTEROID_COUNTER++,
            rotation: 0,
            coordinates: [0,0],
            size: "medium",
          },

          {
            id: ASTEROID_COUNTER++,
            rotation: 45,
            coordinates: [120,55],
            size: "medium",
          },

          {
            id: ASTEROID_COUNTER++,
            rotation: 12,
            coordinates: [90,32],
            size: "medium",
          },

          {
            id: ASTEROID_COUNTER++,
            rotation: 124,
            coordinates: [132,345],
            size: "medium",
          },
        ].forEach((newAsteroid) => newAsteroids.push(newAsteroid))
      }
    } )
  } )
  return { missile: missileCollisions, asteroid: asteroidCollisions, newAsteroids }
}
