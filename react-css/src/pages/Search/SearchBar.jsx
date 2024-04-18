import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useFetch } from "../../hooks/useFetch";
import { Spinner } from "../../components/Spinner";
import { Alert } from "../../components/Alert";
import { Card } from "../../components/Card";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  const { loading, error, data } = useFetch(`https://jsonplaceholder.typicode.com/users`)
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Alert type="danger">{error.toString()}</Alert>
  }

  const handleChange = (value) => {
    setInput(value);
  };
  /*
  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        console.log(value)
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value) ||
            user.username.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };
    const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
*/


  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="row gap-4">
        {data.map((user) => (<div key={user.id} className="col-12 col-md-4">
          <Card
            title={user.name}
            description={user.username}
          />

        </div>))}
      </div>
    </div>
  );
};