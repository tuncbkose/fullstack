import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeHandler = (event) => {
      event.preventDefault()
      const updatedBlog = {...blog, likes: blog.likes+1}
      updateBlog(updatedBlog)
  }

  return (
      <div style={blogStyle}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          {blog.title} <button onClick={toggleVisibility}>hide</button><br/>
          {blog.url}<br/>
          likes {blog.likes} <button onClick={likeHandler}>like</button><br/>
          {blog.user.name}
        </div>
      </div>
  )
}

export default Blog
