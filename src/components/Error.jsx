import React from "react";
import "./Error.css";

export default function Error(props) {
  const {error} = props;

  console.log(error)
    return (
      <div id="error-container">
        <div id="error-item">{error.message}</div>
      </div>
    );

  
}
