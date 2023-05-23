import React from 'react'

function formatTime (time) {
  return new Date(time).toUTCString()
}

export function SearchResult ({ event, onClick }) {
  return (
    <div>
      <h3>{event.name}</h3>
      <p>Start Time: {formatTime(event.startTime)}</p>
      <button onClick={() => onClick(event)}>View Odds</button>
    </div>
  )
}
