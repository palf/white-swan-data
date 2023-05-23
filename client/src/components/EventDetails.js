import React from 'react'

export function EventDetails ({ event }) {
  return (
    <div>
      <h2>{event.name}</h2>
      <p>Start Time: {event.startTime}</p>
      <h3>Horses and Odds</h3>
      <table>
        <tbody>
        {(event.horses || []).map((horse, index) => (
          <tr key={index}>
            <td>{horse.name}</td>
            <td>{horse.odds}</td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}
