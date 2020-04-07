let ASTEROID_COUNTER = 100

function getSize (asteroid) {
  if (asteroid.size === "medium") {
    return "small"
  }
  return "medium"
}

export default function (asteroid) {
  if (asteroid.size === "small") {
    return []
  }
  return(
    [
      {
        id: ASTEROID_COUNTER++,
        rotation: asteroid.rotation+10,
        coordinates: [
          asteroid.coordinates[0]+10,
          asteroid.coordinates[1]+10,
        ],
        size: getSize(asteroid)
      },

      {
        id: ASTEROID_COUNTER++,
        rotation: asteroid.rotation+20,
        coordinates: [
          asteroid.coordinates[0]+20,
          asteroid.coordinates[1]+20,
        ],
        size: getSize(asteroid),
      },

      {
        id: ASTEROID_COUNTER++,
        rotation: asteroid.rotation+5,
        coordinates: [
          asteroid.coordinates[0]+5,
          asteroid.coordinates[1]+5,
        ],
        size: getSize(asteroid),
      },

      {
        id: ASTEROID_COUNTER++,
        rotation: asteroid.rotation+15,
        coordinates: [
          asteroid.coordinates[0]+15,
          asteroid.coordinates[1]+15,
        ],
        size: getSize(asteroid)
      },
    ]
  )
}
