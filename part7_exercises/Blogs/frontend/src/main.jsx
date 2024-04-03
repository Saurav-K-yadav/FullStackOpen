import ReactDOM from 'react-dom/client';
import App from './App';
import notificationReducer from './reducers/notification';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import blogReducer from './reducers/Blogs';
import userReducer from './reducers/user'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        user:userReducer
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
