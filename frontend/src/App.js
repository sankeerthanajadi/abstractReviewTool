import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import Display from './frontPage/display'; // Your main component
//import DocUpload from './myProject/doc_upload'; // Your doc_upload component
// import Login from './loginPage/RegistrationForm'
import { SuggestionsProvider } from "./tool/SuggestionsContext"; 

import FileUpload from './tool/fileUpload';  // Correct path and capitalization
import Suggestions from './tool/suggestions';


function App() {

  const [suggestions, setSuggestions] = useState("");

  return (
    <SuggestionsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Display />} />
        {/* <Route path="/myProject/doc_upload" element={<DocUpload />} /> */}
        <Route path="/tool/fileupload" element={<FileUpload />} />
        <Route path="/tool/suggestions" element={<Suggestions />} />
      </Routes>
    </Router>
    </SuggestionsProvider>
    // //  <Login/>
    // <div className="app-container">
    //   <h1>Abstract Review Tool</h1>
    //   <FileUpload setSuggestions={setSuggestions} /> {/* ✅ Capitalized */}
    //   {suggestions && <Suggestions suggestions={suggestions} />} {/* ✅ Fixed */}
    // </div>
  );
}

export default App;
