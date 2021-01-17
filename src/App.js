import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import Error from "./components/Error";

export default function App() {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState({ items: [] });
  const [error, setError] = useState(null);

  const onQueryChange = (query) => {
    setQuery(query);
  };

  const fetchUserData = async (query) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${query}`,
        {
          headers: {
            // Github authentication is needed for unlimited requests
            authorization: "token " + process.env.REACT_APP_TOKEN,
          },
        }
      );

      if (response.ok) {
        const res = await response.json();
        setUserData(res);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      setError(error);
    }

    // .then((response) => response.json())
    // .then((responseJson) => setUserData(responseJson))
    // .catch((error) => setError(error.message))
  };

  // fetching data when query length is 3 or more
  // clears userData if query length falls under 3.
  useEffect(() => {
    if (query.length > 2) {
      fetchUserData(query);
    } else {
      setUserData({ items: [] });
    }
  }, [query]);

  return (
    <div className="App">
      <div className="container">
        <SearchBar onQueryChange={onQueryChange} />
        <Results userData={userData} />
        {error && <Error error={error} />}
      </div>
    </div>
  );
}
