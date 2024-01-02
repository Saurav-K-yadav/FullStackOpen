const Numbers = ({ persons,del }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((contact) => (
        <li key={contact.id}>
          {contact.name} {contact.number}
          <button onClick={()=>del(contact)}>Delete</button>
        </li>
      ))}
    </>
  );
};

export default Numbers;