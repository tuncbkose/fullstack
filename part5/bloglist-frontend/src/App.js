import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
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

  const createBlog = async (event) => {
    event.preventDefault()
    console.log("Create a new blog with", title, author, url)
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
            <p>{user.name} logged in</p>
            <h2>create new</h2>
            <BlogForm
              createHandler={createBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}/>
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