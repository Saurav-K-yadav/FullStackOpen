import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './App.css'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser]=useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  

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

const loginForm = () => {return (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
);}

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

  const addBlog = () => {
    const newBlog = {
      "title": title,
      "author": author,
      "url":url 
    }
    try
    {
      blogService.create(newBlog)
      console.log(newBlog)
      setBlogs(blogs.concat(newBlog))
      setAuthor("")
      setTitle("")
      setUrl("")
    }
    catch (error) {
      console.log(error)
    }
 } 
  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            name="title"
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="author"
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            name="url"
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </div>
        <button type='submit'>create</button>
      </form>
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
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App