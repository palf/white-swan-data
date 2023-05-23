import React from 'react'
import { render } from '@testing-library/react'
import { EventDetails } from './EventDetails'

describe('Eventdetails', () => {
  test('renders event name', () => {
    const event = {
      name: 'Test Event',
      startTime: '2023-05-24',
      horses: []
    }

    const { getByText } = render(<EventDetails event={event} />)
    const eventName = getByText('Test Event')

    expect(eventName).toBeInTheDocument()
  })

  test('renders start time', () => {
    const event = {
      name: 'Test Event',
      startTime: 'anywhen',
      horses: []
    }

    const { getByText } = render(<EventDetails event={event} />)
    const startTime = getByText('Start Time: anywhen')

    expect(startTime).toBeInTheDocument()
  })

  test('renders horse names and odds', () => {
    const event = {
      name: 'Test Event',
      startTime: '2023-05-24',
      horses: [
        { name: 'Horse 1', odds: '2/1' },
        { name: 'Horse 2', odds: '3/1' },
        { name: 'Horse 3', odds: '4/1' }
      ]
    }

    const { getByText } = render(<EventDetails event={event} />)
    const horse1 = getByText('Horse 1')
    const horse2 = getByText('Horse 2')
    const horse3 = getByText('Horse 3')
    const odds1 = getByText('2/1')
    const odds2 = getByText('3/1')
    const odds3 = getByText('4/1')

    expect(horse1).toBeInTheDocument()
    expect(horse2).toBeInTheDocument()
    expect(horse3).toBeInTheDocument()
    expect(odds1).toBeInTheDocument()
    expect(odds2).toBeInTheDocument()
    expect(odds3).toBeInTheDocument()
  })
})
