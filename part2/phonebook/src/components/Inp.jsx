const Inp = ({ newName, changeName, newNumber, changeNumber, addName }) => {
  return (
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
  );
};

export default Inp;