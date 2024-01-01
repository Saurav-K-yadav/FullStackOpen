const SearchContact = ({
  searchResult,
  handleSearch,
  handleSubmit,
  persons,
}) => {
  return (
    <>
      <h2>Search a Contact</h2>

      <form>
        <input type="text" value={searchResult} onChange={handleSearch} />
        <button onClick={handleSubmit}>Search</button>
        <ul>
          {searchResult === ""
            ? ""
            : persons
                .filter((val) =>
                  val.name.toLowerCase().includes(searchResult.toLowerCase())
                )
                .map((res) => (
                  <li key={res.id}>
                    {res.name} : {res.number}
                  </li>
                ))}
        </ul>
      </form>
    </>
  );
};
export default SearchContact;