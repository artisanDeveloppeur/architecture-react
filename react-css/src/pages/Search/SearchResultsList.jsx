import { SearchResult } from "./SearchResult.jsx";

export const SearchResultsList = ({ results }) => {
  console.log(results)
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult result={result.name} key={id} />;
      })}
    </div>
  );
};