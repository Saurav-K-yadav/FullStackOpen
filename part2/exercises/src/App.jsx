import Note from "./components/note";
import { useState } from "react";

const App = (props) => {
  const [notes,setNotes]=useState(props.notes)
  const [newNote, setNewNote] = useState("a new note..."); 
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important );

  const addNotes = (event) => {
    event.preventDefault();
    const noteobject = {
      content: newNote,
      id:notes.length + 1,
      important:Math.random()<0.5,
    } 
    setNotes(notes.concat(noteobject));
    setNewNote('');
    };

 const handleNoteChange = (event) => {
   console.log(event.target.value);
   setNewNote(event.target.value);
 };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <ul>
        <button onClick={() => { setShowAll(!showAll)}}>Show{ showAll?' Important':' All'}</button>
      </ul>
      <ul>
        <form onSubmit={addNotes}>
          <input value={newNote} onChange={handleNoteChange} required/>
          <button type="submit">Save</button>
        </form>
      </ul>
    </div>
  );
};

export default App;

