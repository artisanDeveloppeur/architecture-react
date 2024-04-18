import { useState } from "react";
import { SearchBar } from "./Search/SearchBar.jsx";
import { SearchResultsList } from "./Search/SearchResultsList.jsx";
export function Search() {
  const [results, setResults] = useState([]);
  return (
    <div className="App">BUG search
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
    </div>
  );
}