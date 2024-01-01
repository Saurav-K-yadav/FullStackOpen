import { useState } from 'react'
const App = () => {
  // const [persons, setPersons] = useState([]);
const [persons, setPersons] = useState([
  { name: "Arto", number: "040-123456", id: 1 },
  { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
  { name: "Dan Abramov", number: "12-43-234345", id: 3 },
  { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
]);
  const [searchResult, setSearchResult] = useState("");
  const [showResult, setShowResult] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  
  const changeName = function (event) {
    console.log(event.target.value)
    setNewName(event.target.value)

  };

  const changeNumber = function (event) {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  
  const addName = function (event) {
    event.preventDefault();
    if (newName == "")
    {
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
        exists = true;;
      }
    });

    if (exists)
      return;

    const block = {
      name: newName,
      number:newNumber,
      id:persons.length+1
    };
 
    setPersons(persons.concat(block));
    console.log(persons);
    setNewName('');
    setNewNumber('');
   }
  
  let handleSearch = function (val) {
    val.preventDefault();
    setSearchResult(val.target.value);
  };

  let handleSubmit = function (val) { val.preventDefault() };
  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search a Contact</h2>

      <form>
        <input type="text" value={searchResult} onChange={handleSearch} />
        <button onClick={handleSubmit}>Search</button>
        <ul>

          {searchResult===""?"":persons.filter(
            (val)=>(val.name.toLowerCase().includes(searchResult.toLowerCase()))
          ).map((res) => (
            <li key={res.id}>{res.name} : { res.number}</li>
          )
          )
          }

        </ul>
      </form>

      <form>
        <h2>Add A New</h2>
        <div>
          Name: <input value={newName} onChange={changeName} />
          <br />
          Number:
          <input value={newNumber} onChange={changeNumber} /> <br />
          <button onClick={addName}>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((contact) => (
        <li key={contact.id}>
          {contact.name} {contact.number}
        </li>
      ))}
    </div>
  );
};

export default App
