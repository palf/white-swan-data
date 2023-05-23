import React, { useState, useEffect } from 'react'
import { SearchBar } from './components/SearchBar'
import { SearchResult } from './components/SearchResult'
import { EventDetails } from './components/EventDetails'
import { fetchSearchResults } from './data/search'
import './App.css'

// Component for the main application
function App () {
  const [searchResults, setSearchResults] = useState([])
  const [selectedResult, setSelectedResult] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (authenticated) {
      fetchSearchResults().then(results => {
        setSearchResults(results)
      })
    }
  }, [authenticated])

  const handleSearch = (searchTerm) => {
    // Perform search and update the search results
    setSearchResults([])
    setSelectedResult(null)
    if (authenticated) {
      fetchSearchResults(searchTerm).then(setSearchResults)
    }
  }

  const handleAuthentication = () => {
    // Perform authentication logic here
    setAuthenticated(true)
  }

  const showSearch = (<>
    <h2>Search</h2>
    <SearchBar onSearch={handleSearch} />

    <h2>Results</h2>
    {searchResults.map((event) => (
      <SearchResult
        key={event.id}
        event={event}
        onClick={setSelectedResult}
      />
    ))}
    </>)

  const loginInCTA = (
    <div><p>Log in to perform searches</p></div>
  )

  const details = (
    <div>
      <h2>Event Details</h2>
      <button onClick={() => setSelectedResult(null)}>Back</button>
      <EventDetails event={selectedResult} />
    </div>
  )

  return (
    <div className='App'>
      <div className='App-header'>
        <header>
          <h1>Event Search</h1>
        </header>
      </div>

      <h2>Authentication</h2>
      {authenticated
        ? (<p>Signed in as admin</p>)
        : (<button onClick={handleAuthentication}>Login</button>)}

      {!authenticated ? loginInCTA : null}
      {selectedResult ? details : showSearch}
    </div>
  )
}

export default App
