import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from "./components/Togglable";
import LoginForm from './components/LoginForm'
import BlogForm from "./components/BlogForm"

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({message: "", color: ""})
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if ( loggedUserJSON ) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', color: "red" })
      setTimeout(()=> {
        setNotification({message: "", color: ""})
      }, 5000)
    }
  }

  const createBlog = async (newBlog) => {
    try {
      await blogService.create(newBlog)
      setBlogs(blogs.concat(newBlog))

      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        color: "green"
      })
      setTimeout(setNotification, 3000, { message: "", color: ""})
    } catch (exception) {
      setNotification({
        message: exception.response.data.error,
        color: "red"
      })
      setTimeout(setNotification, 3000, { message: "", color: ""})
    }
  }

  return (
    <div>
      <Notification settings={notification}/>
      {
        !user &&
          <LoginForm
            loginHandler={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}/>

      }
      {
        user &&
          <>
            <p>
              {user.name} logged in
              <button type="button" onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonLabel="new note">
              <h2>create new</h2>
              <BlogForm createHandler={createBlog}/>
            </Togglable>

              <h2> blogs</h2>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
          </>
      }

    </div>
  )
}

export default App