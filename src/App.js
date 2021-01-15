import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";

export default function App() {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState({items: []});

  const onQueryChange = (query) => {
    setQuery(query);
  };

  const fetchUserData = (query) => {
    fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        // Github authentication is needed for unlimited requests
        authorization: "token " + process.env.REACT_APP_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => setUserData(responseJson))
      .catch((error) => console.log(error));
  };

  // fetching data when query length is 3 or more
  // clears userData if query length falls under 3.
  useEffect(() => {
    if (query.length > 2) {
      fetchUserData(query);
    } else {
      setUserData({items: []});
    }
  }, [query]);

  return (
    <div className="App">
      <div className="container">
        <SearchBar onQueryChange={onQueryChange} />
        <Results userData={userData} />
      </div>
    </div>
  );
}
