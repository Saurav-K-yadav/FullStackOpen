import { useEffect } from 'react';
import { initializeusers } from '../reducers/allUser';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

const UsersDisplay = () => {
    const allUsers = useSelector((state) => state.allUser);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeusers());
    }, [dispatch]);
    const id = useParams().id;
    let user
    if (allUsers.length > 0) {        
        user = allUsers.find((n) => n.id == id);
    }
    else {
        return null
    }

    return (
        <div>
            <h2>{user.username}</h2>
            Added Blogs 
            {user.blogs.map((blog) => (
                <li key={blog.id}> { blog.title}</li>
            ))}

        </div>
    );
};
export default UsersDisplay;
