import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/FilterDisplay";
import Notification from "./components/Notification";

import { setAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import anecdoteService from './services/anecdote'
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(anec => {
      dispatch(setAnecdotes(anec))
    })
  },[dispatch])
  
  return (
    <div>
      <Notification/>
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
