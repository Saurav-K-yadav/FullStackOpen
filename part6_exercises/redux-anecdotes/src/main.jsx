import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import Anecreducer from "./reducers/anecdoteReducer";
import filter from "./reducers/FilterReducer";

const reducer = combineReducers({
  anecdotes: Anecreducer,
  filter: filter,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
