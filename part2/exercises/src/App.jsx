import Note from "./components/note";
import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";

const App = () => {
  const [notes,setNotes]=useState([])
  const [newNote, setNewNote] = useState("a new note..."); 
  const [showAll, setShowAll] = useState(true);

useEffect(() => {
  noteService.getAll().then((response) => {
    setNotes(response);
  });
}, []);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important );

  const addNotes = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      id:notes.length + 1,
      important:Math.random()<0.5,
    }
    
   noteService.create(noteObject).then((response) => {
     console.log(response);
     setNotes(notes.concat(response));
     setNewNote('');
   });
    };

 const handleNoteChange = (event) => {
   console.log(event.target.value);
   setNewNote(event.target.value);
 };

  const toggleImportance = (id) => { 
    console.log(`${id} needs to be toggled important`)
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n.id !== id ? n : response)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={()=> toggleImportance(note.id)} />
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

