import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeusers } from '../reducers/allUser';
import { useDispatch, useSelector } from 'react-redux';

import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material';

const UsersDisplay = () => {
    const allUsers = useSelector((state) => state.allUser);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeusers());
    }, [dispatch]);

    return (
        <div>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Blogs Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{user.blogs.length}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
export default UsersDisplay;
