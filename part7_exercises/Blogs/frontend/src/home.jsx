import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification, clearNotification } from './reducers/notification';
import {
    createBlog,
    initializeBlogs,
    setLiked,
    deleteBlog,
} from './reducers/Blogs';
import { newUser, deleteUser, retriveUserDetails } from './reducers/user';

import './App.css';
import LoginForm from './components/Login';
import Blog from './components/Blog';
import Togglable from './components/Togglable';
import BlogForm from './components/blogform';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const user = useSelector((state) => state.user);
    const blogs = useSelector((state) => state.blogs);
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
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedBlogUser');
        if (loggedUser) {
            dispatch(retriveUserDetails(loggedUser));
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('Logging', username, password);
        const logger = username;
        const code = password;
        try {
            dispatch(newUser(logger, code));
            // console.log(user)
            setUsername('');
            setPassword('');
            dispatch(createNotification(`Hello ${username}`));
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
        dispatch(deleteUser());
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
            console.log(newBlog);
            newBlog = { ...newBlog, likes: 0, user: user };
            dispatch(createBlog(newBlog));
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
            dispatch(setLiked(newBlog));
        } catch (error) {
            dispatch(createNotification(`Some Error Occured `));
            console.log(error);
        }
    };

    const removeBlog = async (Blog) => {
        try {
            dispatch(deleteBlog(Blog));
            dispatch(createNotification(`Deleted '${Blog.title}'`));
        } catch (error) {
            dispatch(createNotification('Failed to remove item'));
            console.log(error);
        }
    };

    return (
        <div>
            {display ? message : ''}
            {user.username === '' ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.username} logged-in</p> <div> {logOutForm()}</div>
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

export default Home;