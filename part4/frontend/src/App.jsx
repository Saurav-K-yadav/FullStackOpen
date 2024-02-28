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
      setBlogs( blogs.sort(function(a,b){return b.likes-a.likes}) )
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
      newBlog = { ...newBlog,likes:0,user:user}
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

  const addLikes = async(blog) => {
    const newBlog={
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      likes:blog.likes+1
      }
    // console.log(`Our Blog ${newBlog}`)
    try {
      await blogService.update(newBlog);
      let newValues=blogs.filter(blog=>blog.id!=newBlog.id)
      newValues=newValues.concat(newBlog)
      // setBlogs(newValues.concat(newBlog));
       setBlogs(newValues.sort(function (a, b) {
         return b.likes - a.likes;
       }))
    }
    
    catch (error) {
      setErrorMessage("operation failed");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      console.log(error);
    }
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
            <Blog key={blog.id} blog={blog} addLikes={ addLikes} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App