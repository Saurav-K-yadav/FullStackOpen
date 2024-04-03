import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification, clearNotification } from './reducers/notification';
import { createBlog, initializeBlogs } from './reducers/Blogs';

import './App.css';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/Login';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import BlogForm from './components/blogform';

const App = () => {
    // const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const blogs=useSelector((state)=>state.blogs)
    const { message, display } = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    // For Notification
    useEffect(() => {
        const time = setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
        return () => clearTimeout(time);
    }, [message, dispatch]);

    // For fetching blogs at start
    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch]);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogUser');
        if (loggedUser) {
            const tobeSet = JSON.parse(loggedUser);
            setUser(tobeSet);
            blogService.setToken(tobeSet.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('Logging', username, password);
        try {
            const currUser = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                'loggedBlogUser',
                JSON.stringify(currUser)
            );
            blogService.setToken(currUser.token);

            setUser(currUser);
            setUsername('');
            setPassword('');
            dispatch(createNotification(`Hello ${currUser.username}`));
        } catch (error) {
            dispatch(createNotification('Invalid Credentials'));
        }
    };

    const loginForm = () => {
        return (
            <LoginForm
                username={username}
                password={password}
                handlePasswordChange={({ target }) => {
                    setPassword(target.value);
                }}
                handleUsernameChange={({ target }) => {
                    setUsername(target.value);
                }}
                handleSubmit={handleLogin}
            />
        );
    };

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedBlogUser');
        setUser('');
        blogService.setToken(null);
        window.location.reload();
        dispatch(createNotification(`LOGGED OUT. Have a Good Day`));
    };

    const logOutForm = () => {
        return (
            <div>
                <button onClick={handleLogOut} id="logout">
                    Logout
                </button>
            </div>
        );
    };

    const addBlog = async (newBlog) => {
        try {
            // await blogService.create(newBlog);
            console.log(newBlog);
            newBlog = { ...newBlog, likes: 0, user: user };
            dispatch(createBlog(newBlog))
            // setBlogs(blogs.concat(newBlog));
            blogFormRef.current.toggleVisibility();
            dispatch(createNotification(`added ${newBlog.title}`));
        } catch (error) {
            dispatch(createNotification(`Some Error Occured `));
            console.log(error);
        }
    };

    const blogFormRef = useRef();

    const blogForm = () => {
        return (
            <Togglable buttonLabel={'Add Note'} ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
        );
    };

    const addLikes = async (blog) => {
        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            id: blog.id,
            likes: blog.likes + 1,
        };
        try {
            await blogService.update(newBlog);
            let newValues = blogs.filter((blog) => blog.id != newBlog.id);
            newValues = newValues.concat(newBlog);
            setBlogs(
                newValues.sort(function (a, b) {
                    return b.likes - a.likes;
                })
            );
        } catch (error) {
            dispatch(createNotification(`Some Error Occured `));
            console.log(error);
        }
    };

    const removeBlog = async (Blog) => {
        try {
            await blogService.remove(Blog);
            let newBlogs = blogs.filter((blog) => blog.id != Blog.id);
            setBlogs(newBlogs);
            dispatch(createNotification(`Deleted '${Blog.title}'`));
        } catch (error) {
            dispatch(createNotification('Failed to remove item'));
            console.log(error);
        }
    };

    return (
        <div>
            {display ? message : ''}
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.name} logged-in</p> <div> {logOutForm()}</div>
                    <div>{blogForm()}</div>
                    <h2>Blogs</h2>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            addLikes={addLikes}
                            removeBlog={removeBlog}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
