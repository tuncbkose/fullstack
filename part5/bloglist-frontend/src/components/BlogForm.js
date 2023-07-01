import { useState } from 'react'

const BlogForm = ({ createHandler }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    createHandler(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
                title:
        <input
          type="text"
          value={title}
          id="blogform-title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
                author:
        <input
          type="text"
          value={author}
          id="blogform-author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
                url:
        <input
          type="text"
          value={url}
          id="blogform-url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit" id='blogform-submit'>create</button>
    </form>
  )
}

export default BlogForm