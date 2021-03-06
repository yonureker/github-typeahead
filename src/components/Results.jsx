import React from "react";
import "./Results.css";

export default function Results(props) {
  const { userData } = props;

  return (
    <div id="results-container">
      {userData.items.map((item, index) => (
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
  );
}
