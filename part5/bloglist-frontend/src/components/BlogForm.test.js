import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  const blog = {
    title: 'Best Blog Ever',
    author: 'Mr Blog',
    url: 'www.blog.com',
    likes: 1,
    user: {
      username: 'Name'
    }
  }

  test('createHandler receives proper data', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    render(<BlogForm createHandler={mockHandler}/>)

    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByText('create')
    await user.type(inputs[0], 'Title')
    await user.type(inputs[1], 'Author')
    await user.type(inputs[2], 'URL')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe('Title')
    expect(mockHandler.mock.calls[0][0].author).toBe('Author')
    expect(mockHandler.mock.calls[0][0].url).toBe('URL')

  })
})
