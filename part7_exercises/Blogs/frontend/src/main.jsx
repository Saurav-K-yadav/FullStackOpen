import ReactDOM from 'react-dom/client';
import App from './App';
import notificationReducer from './reducers/notification';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import blogReducer from './reducers/Blogs';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
