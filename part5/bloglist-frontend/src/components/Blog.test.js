import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'Best Blog Ever',
    author: 'Mr Blog',
    url: 'www.blog.com',
    likes: 1,
    user: {
      username: 'Name'
    }
  }
  const sessionUser = {
    username: 'Name2'
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(<Blog
      blog={blog}
      sessionUser={sessionUser}
      updateBlog={mockHandler}/>).container
  })

  test('renders content', () => {
    const entry = container.querySelector('.blogEntry')
    const short = entry.querySelector('.short')
    const long = entry.querySelector('.long')
    expect(short).not.toHaveStyle('display: none')
    expect(long).toHaveStyle('display: none')
    expect(short).toHaveTextContent('Best Blog Ever')
    expect(short).toHaveTextContent('Mr Blog')
    expect(short).not.toHaveTextContent('www.blog.com')
    expect(short).not.toHaveTextContent('likes')
  })

  test('view button works', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.viewButton')
    await user.click(button)
    const long = container.querySelector('.long')
    expect(long).not.toHaveStyle('display: none')
    expect(long).toHaveTextContent('www.blog.com')
    expect(long).toHaveTextContent('likes 1')
  })

  test('like button', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.likeButton')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})