import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, setLiked, deleteBlog } from '../reducers/Blogs';
import { useParams } from 'react-router-dom';
import { createNotification } from '../reducers/notification';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import blogService from '../services/blogs';
import '../css/blog.css';

const Blogs = () => {
    const [newComment, setNewComment] = useState('');

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
    const navigate = useNavigate();
    const removeBlog = async (Blog) => {
        try {
            dispatch(deleteBlog(Blog));
            dispatch(createNotification(`Deleted '${Blog.title}'`));
            navigate('/');
        } catch (error) {
            dispatch(createNotification('Failed to remove item'));
            console.log(error);
        }
    };

    const blogs = useSelector((state) => state.blogs);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    const id = useParams().id;
    let blog;
    if (blogs.length > 0) {
        blog = blogs.find((n) => n.id == id);
    } else {
        return null;
    }

    const increaseLike = () => {
        console.log(blog.user);
        addLikes(blog);
        dispatch(initializeBlogs());
    };
    const deleteItem = () => {
        const confirm = window.confirm(`Delete '${blog.title}' ?`);
        if (confirm) {
            removeBlog(blog);
        }
    };
    const comments = blog.comments;

    const addComment = async () => {
        if (newComment === '') {
            return;
        }
        try {
            const { comments, ...newBlog } = blog;
            await blogService.addcomment({ ...newBlog, comments: newComment });
            setNewComment('');
            dispatch(initializeBlogs());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="blog-post">
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-content">URL : {blog.url}</div>
            <br />
            <div className="blog-meta">
                <span className="blog-author">By: {blog.author}</span>
                <span className="blog-date">
                    <button onClick={increaseLike} id="like">
                        Likes:
                    </button>{' '}
                    {blog.likes}
                </span>
                <br />

                <div className="comments-section">
                    <h2>Comments:</h2>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            addComment();
                        }}
                    >
                        <input
                            type="text"
                            name="url"
                            onChange={({ target }) => {
                                setNewComment(target.value);
                            }}
                            placeholder="Enter your comment"
                            value={newComment}
                            className="comment-input"
                        />
                        <button type="submit" className="comment-submit">
                            Create
                        </button>
                    </form>
                    <br />
                    <ul className="comment-list">
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <span className="comment-text">{comment}</span>
                            </div>
                        ))}
                    </ul>
                    <button onClick={deleteItem} className="comment-submit">
                        Delete Blog
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
