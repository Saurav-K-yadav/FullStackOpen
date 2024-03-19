import { useDispatch,useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";



const AnecdoteList = () => {
  
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter ==='') {
      return anecdotes
    }
    else { 
      // return anecdotes.filter((val) => {
      //   val.includes(filter)
      // })

      const newList=anecdotes.filter((curr) => {
        return curr.content.toLowerCase().includes(filter.pattern.toLowerCase())
      } )
      console.log(`List :${newList}`)
      return newList;
      
      
    }
  }
  );
      const dispatch = useDispatch();

      const vote = (id) => {
        console.log("vote", id);
        dispatch(addVote(id));
      };
      
    
    return (
        <>
          <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))
    }
    </>
    )
}

export default AnecdoteList;