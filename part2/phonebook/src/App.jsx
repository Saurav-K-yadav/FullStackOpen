import { useState } from "react";
import Inp from "./components/Inp"
import Numbers from "./components/numbers";
import SearchContact from "./components/contact";


const App = () => {
    const [persons, setPersons] = useState([
      { name: "Arto Hellas", number: "040-123456", id: 1 },
      { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
      { name: "Dan Abramov", number: "12-43-234345", id: 3 },
      { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
  const [searchResult, setSearchResult] = useState("");

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

    let exists = false;
    persons.forEach((val) => {
      if (val.name === newName) {
        alert(`${newName} already exists`);
        exists = true;
      }
    });

    if (exists) return;

    const block = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(block));
    console.log(persons);
    setNewName("");
    setNewNumber("");
  };

  let handleSearch = function (val) {
    val.preventDefault();
    setSearchResult(val.target.value);
  };

  let handleSubmit = function (val) {
    val.preventDefault();
  };
  return (
    <div>
      <h1>Phonebook</h1>
 
      <SearchContact searchResult={searchResult} handleSearch={handleSearch} handleSubmit={handleSubmit} persons={ persons} />
      
      <Inp newName={newName} changeName={changeName} newNumber={newNumber} changeNumber={changeNumber} addName={ addName} />
      <Numbers persons={persons}/>
    </div>
  );
};

export default App;
