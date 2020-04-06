export default function detectCollisions(missiles, asteroids) {
  const missileCollisions = []
  const asteroidCollisions = []
  missiles.forEach((missile) => {
    asteroids.forEach((asteroid) => {
      if (
        missile.coordinates[0] >= asteroid.coordinates[0] &&
        missile.coordinates[0] <= asteroid.coordinates[0]+50 &&
        missile.coordinates[1] >= asteroid.coordinates[1] &&
        missile.coordinates[1] <= asteroid.coordinates[1]+50
      ) {
         missileCollisions.push(missile.id)
         asteroidCollisions.push(asteroid.id)
      }
    } )
  } )
  return { missileCollisions, asteroidCollisions }
}
