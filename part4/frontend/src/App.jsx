import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './App.css'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/blogform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser]=useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const tobeSet = JSON.parse(loggedUser)
      setUser(tobeSet)
      blogService.setToken(tobeSet.token)
    }
  },[])

  const handleLogin = async(event) => {
    event.preventDefault()
    console.log('Logging', username, password)
    try {
      const currUser = await loginService.login({
        username,password
      })
      window.localStorage.setItem('loggedBlogUser',JSON.stringify(currUser))
      blogService.setToken(currUser.token)

      setUser(currUser)
      setUsername('')
      setPassword('')
        setErrorMessage("Sucessfully Logged In");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
     }
    catch (error) {
      setErrorMessage('Invalid Credentials')
      setTimeout (() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const loginForm = () => {
    return (
        <LoginForm username={username}
          password={password}
          handlePasswordChange={({ target }) => { setPassword(target.value) }}
          handleUsernameChange={({ target }) => { setUsername(target.value) }}
          handleSubmit={handleLogin}
        />
    );
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser('')
    blogService.setToken(null)
    window.location.reload();
    setErrorMessage('Logged Out');
    
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  } 
  
  const logOutForm = () => {
    return (
      <div>
        <button onClick={handleLogOut}>Logout</button>
    </div>
  );
   
 } 

  const addBlog = async (newBlog) => {

    try
    {
      await blogService.create(newBlog)
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))

      setErrorMessage(`added ${newBlog.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    catch (error) {
      setErrorMessage("operation failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log(error)
    }
  } 
  
  const blogForm = () => {
    return (
      <Togglable buttonLabel={"Add Note" }>
        <BlogForm createBlog={addBlog} />
      </Togglable>
        
    );
  }
  
  return (
    <div>
      {errorMessage === null ? "" : errorMessage}

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
          {user.name} logged-in</p> <div> {logOutForm()}</div>
          <div>{blogForm()}</div>
          <h2>Blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={ user.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App