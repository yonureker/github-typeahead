import "./App.css";
import useSWR from "swr";
import React, { useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const [query, setQuery] = useState("");
  const { data, error } = useSWR(
    query.length >= 3 ? `https://api.github.com/search/users?q=${query}` : null,
    fetcher
  );

  return (
    <div className="App">
      <div className="container">
        <div id="search-bar">
          <input
            type="search"
            placeholder="Enter username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div id="results-container" ref={(node) => node}>
          {data &&
            data.hasOwnProperty("items") &&
            data.items.map((item, index) => (
              <div id="results-item" key={index}>
                <div id="profile-photo">
                  <img src={`${item.avatar_url}`} alt="profile" />
                </div>
                <div id="username">
                  <a href={`${item.html_url}`}>{item.login}</a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
