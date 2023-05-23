import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  test('updates input value correctly', () => {
    const { getByRole } = render(<SearchBar onSearch={() => {}} />)
    const input = getByRole('textbox')

    fireEvent.change(input, { target: { value: 'Test' } })

    expect(input.value).toBe('Test')
  })

  test('calls onSearch with the correct search term', () => {
    const onSearchMock = jest.fn()
    const { getByRole, getByText } = render(<SearchBar onSearch={onSearchMock} />)
    const input = getByRole('textbox')
    const searchButton = getByText('Search')

    fireEvent.change(input, { target: { value: 'Test' } })
    fireEvent.click(searchButton)

    expect(onSearchMock).toHaveBeenCalledWith('Test')
  })
})
