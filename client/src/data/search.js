import { fakeResults } from './fake'

export async function fetchSearchResults (searchTerm = null) {
  // we would make some API request here
  // in the interest of focusing on the React app, I'm faking all the data
  // because the API for Part 01 does not expose events, only odds for one event

  if (searchTerm) {
  // using a basic case-insensitive substring search here
    return fakeResults.filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()))
  } else {
    return fakeResults
  }
}
