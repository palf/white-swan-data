function oneOf (xs) {
  const index = Math.floor(Math.random() * xs.length)
  return xs[index]
}

const fakeOdds = () => oneOf([
  '10/1',
  '11/1',
  '11/25',
  '12/1',
  '13/2',
  '15/1',
  '2/1',
  '3/1',
  '3/2',
  '3/4',
  '4/1',
  '4/5',
  '5/1',
  '5/2',
  '5/4',
  '6/1',
  '6/5',
  '7/1',
  '7/2',
  '7/5',
  '8/1',
  '8/5',
  '9/1',
  '9/2',
  '9/5'
])

const fakeNames = () => oneOf([
  'Blazing Comet',
  'Crimson Thunder',
  'Diamond Mirage',
  'Dreamweaver',
  'Enchanted Knight',
  'Golden Arrow',
  'Golden Eclipse',
  'Lightning Bolt',
  'Midnight Rhapsody',
  'Midnight Serenade',
  'Mystic Mirage',
  'Noble Legacy',
  'Onyx Mystique',
  'Radiant Beauty',
  'Royal Ascendant',
  'Scarlet Tempest',
  'Secret Symphony',
  'Silver Streak',
  'Starry Gallop',
  'Swift Victory',
  'Thundering Glory',
  'Thunderstrike',
  'Velvet Dreamer',
  'Whispering Meadow',
  'Wildfire Spirit'
])

const fakeCity = () => oneOf([
  'Aurora',
  'Brookhaven',
  'Cascade Falls',
  'Cedar Hills',
  'Clearwater',
  'Emerald Bay',
  'Evergreen',
  'Harborview',
  'Lakeview',
  'Maplewood',
  'Meadowbrook',
  'Mountainview',
  'Oakwood',
  'Oceanview',
  'Pinecrest',
  'Pleasantville',
  'Riverside',
  'Riverview',
  'Rosewood',
  'Silverstone',
  'Springdale',
  'Sterling Heights',
  'Sun Valley',
  'Willow Creek',
  'Willowbrook'
])

const fakeTime = () => oneOf([
  '2023-02-14T19:30:00',
  '2023-02-14T19:00:00',
  '2023-02-14T18:30:00',
  '2023-02-14T20:30:00',
  '2023-02-14T21:00:00',
  '2023-02-15T19:30:00',
  '2023-02-15T19:00:00',
  '2023-02-15T18:30:00',
  '2023-02-15T20:30:00',
  '2023-02-15T21:00:00',
  '2023-02-17T19:30:00',
  '2023-02-17T19:00:00',
  '2023-02-17T18:30:00',
  '2023-02-17T20:30:00',
  '2023-02-17T21:00:00'
])

function byName (a, b) {
  if (a.name > b.name) {
    return 1
  } else if (a.name < b.name) {
    return -1
  } else {
    return 0
  }
}

function byStartTime (a, b) {
  if (a.startTime > b.startTime) {
    return 1
  } else if (a.startTime < b.startTime) {
    return -1
  } else {
    return 0
  }
}

function createFakeHorses () {
  const count = 3 + Math.floor(Math.random() * 5)
  const results = []

  for (let i = 0; i < count; i++) {
    const row = { id: i, name: fakeNames(), odds: fakeOdds() }
    results.push(row)
  }

  return results
}

function createFakeResults () {
  const count = 8 + Math.floor(Math.random() * 12)
  const results = []

  for (let i = 0; i < count; i++) {
    const row = {
      id: i,
      name: fakeCity(),
      startTime: fakeTime(),
      horses: createFakeHorses()
    }
    results.push(row)
  }

  return results
}

export const fakeResults = createFakeResults().sort(byName).sort(byStartTime)
