import { useDispatch,useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter ==='') {
      return anecdotes
    }
    else { 

      const newList=anecdotes.filter((curr) => {
        return curr.content.toLowerCase().includes(filter.pattern.toLowerCase())
      } )
      return newList;
      
    }
  }
  );
      const dispatch = useDispatch();

      const vote = (anecdote) => {
        dispatch(addVote(anecdote));
        dispatch(createNotification(`Voted ${anecdote.content}`))
      };
        
  return (
        <>
          <h2>Anecdotes</h2>
        {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))
    }
    </>
    )
}

export default AnecdoteList;