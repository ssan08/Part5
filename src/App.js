import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)
  const [blogsU, setBlogsU] = useState([])
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const clearLS = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setTimeout(function () {
      document.location.reload()
    }, 2000)

  }

  const Notification = (props) => {
    if (props.message === null) {
      return null
    }
    else if (props.no === 0) {
      return (
        <div className="msg">
          {props.message}
        </div>
      )
    }
    else {
      return (
        <div className="error">
          {props.message}
        </div>
      )
    }

  }

  function data(blogs, user) {
    var blogsD = []
    for (let index = 0; index < blogs.length; index++) {
      const element = blogs[index]

      if (element.user) {
        if (element.user.username === user.username) {
          blogsD = blogsD.concat({ id: element.id, title: element.title, author: element.author, likes: element.likes, url: element.url })
        }
      }
    }

    blogsD.sort(function (a, b) {
      return b.likes - a.likes
    })
    return blogsD
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.getAll().then(blogs =>
        setBlogsU(data(blogs, user)))
      blogService.setToken(user.token)
    }
  }, [])




  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setBlogsU(data(blogs, user))
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const handleBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`A new blog ${title} by ${author} added`)
      })

    setTimeout(function () {
      document.location.reload()
    }, 2000)

  }


  const blogForm = () => (
    <Togglable buttonLabel='new Blog'>
      <BlogForm
        author={author}
        title={title}
        url={url}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        handleSubmit={handleBlog}
      />
    </Togglable>
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} no={1} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id = "username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id = "password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id = "login-button" type="submit">login</button>
        </form>
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} no={0} />
      <p>{user.name} logged in <button id = "logout-button" onClick={() => clearLS()}>log out</button> </p>
      {blogForm()}
      {blogsU.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )




}

export default App