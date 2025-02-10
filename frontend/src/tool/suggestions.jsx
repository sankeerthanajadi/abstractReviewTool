// import React from "react";
// import { useContext } from "react";

// import { SuggestionsContext } from "./SuggestionsContext";
// function Suggestions({ suggestions }) {
//   const { suggestions } = useContext(SuggestionsContext);
//   return (
//     <div className="suggestions-box">
//       <h2>AI Suggestions</h2>
//       {/* <pre>{suggestions}</pre> */}
//       <pre>{suggestions || "No suggestions available."}</pre>
//     </div>
//   );
// }

// export default Suggestions;


import React, { useContext } from "react";
import { SuggestionsContext } from "./SuggestionsContext";
import './suggest.css'

function Suggestions({ suggestions: propSuggestions }) {
  const { suggestions: contextSuggestions } = useContext(SuggestionsContext);

  return (
    <>
    <div className="suggestions-box">
      <h2 className="suggestions-title">AI Review for your Abstract</h2>
      <div className="suggestions-content">
    <pre>{propSuggestions || contextSuggestions || "No suggestions available."}</pre>
  </div>
    </div>
    <p className="again">**Include these changes in your document and upload again for the review**</p>
    </>
  );
}

export default Suggestions;


