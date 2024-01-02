const Note = ({ note,toggleImportance }) => {
const label=note.important?'Mark Not Important ':"Mark Important"
  return (<li className="note">{note.content}
    <button onClick={toggleImportance}> {label } </button>
  </li>)
};

export default Note;
