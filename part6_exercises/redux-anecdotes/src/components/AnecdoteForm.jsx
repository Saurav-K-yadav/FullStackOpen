import { useDispatch } from "react-redux";
import { createAnec } from "../reducers/anecdoteReducer"; 
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => { 
const dispatch = useDispatch();

  const newAnecdote = async(event) => {
    event.preventDefault();
    dispatch(createNotification(`Added : ${event.target.newAnec.value}`));
    dispatch(createAnec(event.target.newAnec.value));

    event.target.newAnec.value = "";
  };
    
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
          <div>
            <input name="newAnec" />
          </div>
          <button type="submit">create</button>
        </form>
      </>
    );
}


export default AnecdoteForm;