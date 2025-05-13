
// import React, { useContext } from "react";
// import { SuggestionsContext } from "./SuggestionsContext";
// import './suggest.css'

// function Suggestions({ suggestions: propSuggestions }) {
//   const { suggestions: contextSuggestions } = useContext(SuggestionsContext);

//   return (
//     <>
//     <div className="suggestions-box">
//       <h2 className="suggestions-title">AI Review for your Abstract</h2>
//       <div className="suggestions-content">
//     <pre>{propSuggestions || contextSuggestions || "No suggestions available."}</pre>
//   </div>
//     </div>
//     <p className="again">**Include these changes in your document and upload again for the review**</p>
//     <button className="notify">Send to guide</button>
//     </>
//   );
// }

// export default Suggestions;






import React, { useContext, useState } from "react";
import { SuggestionsContext } from "./SuggestionsContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./suggest.css";

function Suggestions({ suggestions: propSuggestions}) {
  const { suggestions: contextSuggestions } = useContext(SuggestionsContext);
  const location = useLocation();
  const fileName = location.state?.fileName || "";
  const [isSending, setIsSending] = useState(false);

  const handleNotifyGuide = async () => {
    const guideEmail = prompt("Enter Guide's Email:");

    if (!guideEmail) {
      alert("Guide email is required.");
      return;
    }

    //console.log("Checking fileName before sending request:", fileName);

    if (!fileName) {
      alert("Error: File name is missing.");
      console.error("File name is undefined or empty.");
      return;
    }

    setIsSending(true);
    //console.log("Sending request with:", { guide_email: guideEmail, file_name: fileName });

    try {
      const response = await axios.post(
        "http://localhost:5000/send-notification",
        {
          guide_email: guideEmail,
          file_name: fileName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //console.log("Server Response:", response.data);
      alert(response.data.message || "Notification sent successfully.");
    } catch (error) {
      console.error("Error notifying guide:", error.response ? error.response.data : error);
      alert(error.response?.data?.error || "Failed to notify guide.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="suggestions-box">
        <h2 className="suggestions-title">AI Review for your Abstract</h2>
        <div className="suggestions-content">
          <pre>{propSuggestions || contextSuggestions || "No suggestions available."}</pre>
        </div>
      </div>
      <p className="again">**Include these changes in your document and upload again for the review**</p>
      {/* <button className="notify" onClick={handleNotifyGuide} disabled={isSending}>
        {isSending ? "Sending..." : "Send to Guide"}
      </button> */}

      <div className="button-wrapper">
      <span className="finger-emoji" role="img" aria-label="pointing finger">👉</span>
      <button className="notify" onClick={handleNotifyGuide} disabled={isSending}>
        {isSending ? "Sending..." : "Send to Guide"}
      </button>
    </div>
    </>
  );
}

export default Suggestions;
