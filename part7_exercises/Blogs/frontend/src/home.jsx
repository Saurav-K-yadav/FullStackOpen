import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNotification, clearNotification } from './reducers/notification';
import { createBlog, initializeBlogs } from './reducers/Blogs';
import { newUser, deleteUser, retriveUserDetails } from './reducers/user';
import { Link } from 'react-router-dom';

import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import { styled } from '@mui/material/styles';

import LoginForm from './components/Login';
import Togglable from './components/Togglable';
import BlogForm from './components/blogform';
import { blue, red } from '@mui/material/colors';

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

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div>
            {display ? message : ''}
            {user.username === '' ? (
                loginForm()
            ) : (
                <div>
                    <div>
                        {user.username} logged-in{logOutForm()}
                    </div>
                    <div>{blogForm()}</div>
                    <TableContainer className="m-5" component={Paper}>
                        <Table stickyHeader aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">
                                        <h3>BLOGS</h3>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {blogs.map((blog) => (
                                    <StyledTableRow hover key={blog.id}>
                                        <StyledTableCell>
                                            <Link to={`/blogs/${blog.id}`}>
                                                {blog.title}
                                            </Link>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default Home;
