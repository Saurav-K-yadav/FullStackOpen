import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import App from "./App";
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
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
