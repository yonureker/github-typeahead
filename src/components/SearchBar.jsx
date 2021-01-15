import React from "react";
import './SearchBar.css';

export default function SearchBar(props) {

  return (
    <div id="search-bar">
      <input
        type="search"
        placeholder="Enter username"
        onChange={(e) => props.onQueryChange(e.target.value)}
      />
    </div>
  );
}
