import { configureStore } from "@reduxjs/toolkit";
import Anecreducer from "./reducers/anecdoteReducer";
import filter from "./reducers/FilterReducer";
import notificationReducer from "./reducers/notificationReducer";


const store = configureStore({
    reducer: {
        anecdotes: Anecreducer,
        filter: filter,
        notification: notificationReducer,
    },

});
export default store