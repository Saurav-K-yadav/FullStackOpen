import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, setLiked, deleteBlog } from '../reducers/Blogs';
import { useParams } from 'react-router-dom';
import { createNotification } from '../reducers/notification';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const Displayer = () => {
        let currUser = 'SAURAV';
        if (blog.user == undefined) {
            currUser = '';
        } else {
            currUser = blog.user.name;
        }
        return <div>Added by : {currUser}</div>;
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
    const navigate=useNavigate()
    const removeBlog = async (Blog) => {
        try {
            dispatch(deleteBlog(Blog));
            dispatch(createNotification(`Deleted '${Blog.title}'`));
            navigate('/')
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
    };
    const deleteItem = () => {
        const confirm = window.confirm(`Delete '${blog.title}' ?`);
        if (confirm) {
            removeBlog(blog);
        }
    };
    const comments=blog.comments
    console.log(blog.comments)
    return (
        <div>
            <h2>{blog.title}</h2>
            <br />
            Author : {blog.author}
            <br />
            URL : {blog.url}
            <br />
            Likes : {blog.likes}
            <button onClick={increaseLike} id="like">
                like
            </button>
            <br />
            <Displayer key={Math.random()} />
            <br />
            <h2> Comments:</h2>{
                comments.map(comment => (
                <li key={Math.random()}>{comment}</li>
                ))
            }
            <button onClick={deleteItem} id="delete">
                delete blog
            </button>
            <br />
        </div>
    );
};

export default Blogs;
