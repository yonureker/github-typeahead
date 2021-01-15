import "./App.css";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import token from "./config/token";

function App() {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState({});

  const onQueryChange = (query) => {
    setQuery(query);
  };

  const fetchUserData = (query) => {
    fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        authorization: "token " + token,
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
      setUserData({});
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

export default App;
