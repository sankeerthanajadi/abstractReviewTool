import React from "react";

function Suggestions({ suggestions }) {
  return (
    <div className="suggestions-box">
      <h2>AI Suggestions</h2>
      <pre>{suggestions}</pre>
    </div>
  );
}

export default Suggestions;
