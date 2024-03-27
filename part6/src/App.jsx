import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

import { useEffect } from "react";
import notesService from './services/notes'
import { setNotes,inintializeNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(inintializeNotes())
  },[])

  return (
    <div>
      <NewNote />
    <VisibilityFilter/>
      <Notes />
    </div>
  );
};

export default App;
