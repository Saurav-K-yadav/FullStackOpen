import React from 'react';
import Home from './home';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UsersDisplay from './components/users';
import { Container } from '@mui/material';
import UserId from './components/UserId'
import Blogs from './components/Blogs';
const App = () => {
    const padding = {
        padding: 5,
    };
    return (
        <Container>
            <Router>
                <div>
                    <Link style={padding} to="/">
                        Home
                    </Link>
                    <Link style={padding} to="/users">
                        users
                    </Link>
                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<UsersDisplay />} />
                    <Route path="/users/:id" element={<UserId />} />
                    <Route path='/blogs/:id' element={<Blogs/> } />
                </Routes>
            </Router>
        </Container>
    );
};
export default App;
