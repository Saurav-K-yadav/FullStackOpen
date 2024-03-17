import { useSelector, useDispatch } from "react-redux";
import { addVote, newAnec } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(addVote(id));
  };

  const newAnecdote = (event) => {
    event.preventDefault();
    dispatch(newAnec(event));
    event.target.newAnec.value=''
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="newAnec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
