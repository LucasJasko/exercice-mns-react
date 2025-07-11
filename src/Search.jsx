const Search = ({ setKeyword }) => {
  return (
    <input
      className="search-input"
      type="search"
      name="search"
      id="search"
      placeholder="Rechercher un snippet par titre ou langage"
      onInput={(e) => setKeyword(e.target.value)}
    />
  );
};

export default Search;
