import Note from "./components/note";
import { useState, useEffect } from "react";
import Notification from "./components/notification";
import noteService from "./services/notes";
import loginService from "./services/login"
import LoginForm from "./components/loginForm";
import Togglable from "./components/togglable";
import NoteForm from "./components/noteForm";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <p>
        Note app, Made By Saurav Kumar Yadav<br></br>
      </p>
      <a href="https://github.com/Saurav-K-yadav/Saurav-K-yadav/tree/main">
        github: Saurav-K-yadav
      </a>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)

  useEffect(() => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJson) { 
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNotes = (noteObject) => {

    noteService.create(noteObject).then((response) => {
      console.log(response);
      setNotes(notes.concat(response));
    });
  };

  const toggleImportance = (id) => {
    console.log(`${id} needs to be toggled important`);
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n.id !== id ? n : response)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging')
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser',JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage("Sucessfully Loggedin");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note">
        <NoteForm
          createNote={addNotes}
        />
      </Togglable>
    );
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? loginForm() :
        <div>
          <p>{user.name } logged-in</p>
          {noteForm()}
          </div>
        }


      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <ul>
        <button
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          Show{showAll ? " Important" : " All"}
        </button>
      </ul>

      <Footer />
    </div>
  );
};

export default App;
