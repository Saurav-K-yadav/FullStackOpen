import { useState, useEffect } from "react";
import Inp from "./components/Inp";
import Numbers from "./components/numbers";
import SearchContact from "./components/contact";
import services from "./services/modules";
import "./App.css";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState("...");

  useEffect(() => {
    console.log("Fetching");
    services.getAll("http://localhost:3001/persons").then((response) => {
      setPersons(response);
    });
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, []);

  const changeName = function (event) {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const changeNumber = function (event) {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const addName = function (event) {
    event.preventDefault();
    if (newName == "") {
      alert(`Empty Field !!! `);
      return;
    }
    if (newNumber == "") {
      alert(`Empty Field !!! `);
      return;
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (existingPerson) {
      const changedPerson = { ...existingPerson, number: newNumber };
      const id = existingPerson.id;

      services.update(id, changedPerson).then((returnedPerson) => {
        
        if (returnedPerson.name == "AxiosError") {
          const content = returnedPerson.response.data 
          const parser = new DOMParser()
          const doc = parser.parseFromString(content, 'text/html')
          const preE = doc.querySelector('pre');
          if(preE)
          {
            const textContent = preE.textContent || preE.innerHTML;
            const errorMessage=textContent.split('.')
            setMessage(errorMessage[0]);
          }
        
        } else {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
          setMessage(`Updated ${existingPerson.name}`);
        }
      });

      setNewName("");
      setNewNumber("");
      setTimeout(() => {
        setMessage("");
      }, 5000);
      return;
    }

    const block = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    services
      .create(block)
      .then((response) => {
        console.log(response);
        setPersons(persons.concat(response));
        setMessage(`Added ${response.name}`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
        setNewName("");
        setNewNumber("");
      })
      .catch(error => {
        if (error.name == "AxiosError") {
          const content = error.response.data
          const parser = new DOMParser()
          const doc = parser.parseFromString(content, 'text/html')
          const preE = doc.querySelector('pre');
          if (preE) {
            const textContent = preE.textContent || preE.innerHTML;
            const errorMessage = textContent.split('.')
            setMessage(errorMessage[0]);
          }
        
        }
      });
  };

  let handleSearch = function (val) {
    val.preventDefault();
    setSearchResult(val.target.value);
  };

  let handleSubmit = function (val) {
    val.preventDefault();
  };

  let delContact = (contact) => {
    const result = window.confirm(
      `Delete ${contact.name} from your phonebook?`
    );
    if (!result) {
      return;
    }

    services
      .del(contact.id)
      .then(() => {
        setPersons(persons.filter((per) => per.id !== contact.id));
        setMessage(`Deleted ${contact.name}`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      })
      .catch((error) => {
        setMessage(`Information of ${contact.name} is already removed`);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };
  return (
    <div>
      <div>{message === "" ? "" : <p className="alert">{message}</p>}</div>

      <h1>Phonebook</h1>

      <SearchContact
        searchResult={searchResult}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        persons={persons}
      />

      <Inp
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNumber={changeNumber}
        addName={addName}
      />
      <Numbers persons={persons} del={delContact} />
    </div>
  );
};

export default App;
