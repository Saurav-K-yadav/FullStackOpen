const Numbers = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((contact) => (
        <li key={contact.id}>
          {contact.name} {contact.number}
        </li>
      ))}
    </>
  );
};

export default Numbers;