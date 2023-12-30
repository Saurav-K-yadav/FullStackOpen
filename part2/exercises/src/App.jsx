import Notes from './components/note'

const App = ({ notes }) => {

  return (
    <div>
      <h1>Notes</h1>

      <ul>
        {notes.map((note) => (
          <Notes key={note.id} note={ note}/>
        ))}
      </ul>
    </div>
  );
};

export default App;
